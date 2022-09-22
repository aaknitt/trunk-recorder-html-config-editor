#!/usr/bin/python3

import datetime
import json
import logging
import decimal
from copy import deepcopy

class DecimalEncoder(json.JSONEncoder):
	def default(self, o):
		if isinstance(o, decimal.Decimal):
			return str(o)
		if isinstance(o, datetime.datetime):
			return o.isoformat()
		return super(DecimalEncoder, self).default(o)
				
class tr_autotune:
	# Ya ya... I dont want to always redo the math :|
	class multipliers:
		khz = 1000
		mhz = 1e+6

	def down_convert(self, value, multiplier):
		return (value / multiplier).__round__(4)

	def up_convert(self, value, multiplier):
		return (value * multiplier).__round__(4)

	def clean_frequencies(self, freqs):
		new_freqs = []
		freqs.sort()
		for freq in freqs:
			new_freqs.append(int(self.up_convert(freq, self.multipliers.mhz)))
		return new_freqs

	def validate_coverage(self, radio_list, freq_list):
		results = []
		all_freq_covered = True
		
		for radio in range(1, len(radio_list) + 1):
			covered = False
			for freq in radio_list[radio]["freqs"]:
				if radio_list[radio]["low"]  <= freq <= radio_list[radio]["high"]:
					covered = True
			results.append({"freq": freq, "covered": covered})

		for result in results:
			if not result["covered"]:
				all_freq_covered = False

		if not all_freq_covered:
			raise ValueError("Not all frequencies are covered!")

		logging.warning(f"[+] Validated all {str(len(freq_list))} channels are covered")

				
	def calculate_center(self, lower_freq, upper_freq, system_freqs):
		center = (lower_freq + upper_freq)/2

		rounding_change = 10000.0 # in HZ
		bad_center = False
		for freq in system_freqs:			
			freq_rounded = self.up_convert(freq, self.multipliers.mhz)
			# Check if our center freq is too close
			if freq_rounded - rounding_change <= center <= freq_rounded + rounding_change:
				bad_center = True

		if bad_center:
			center = center + rounding_change

		return center
	########################################################################


	def find_freqs(self, SYSTEM_FREQ_LIST, MAX_SDR_BANDWIDTH=3.2, SPECTRUM_BANDWIDTH=12.5):
		# sort our freqs low to high
		SYSTEM_FREQS = self.clean_frequencies(SYSTEM_FREQ_LIST)
		print(SYSTEM_FREQS)

		# Get our bandwith's
		# sdr_bandwidth = self.up_convert(SDR_BANDWIDTH, self.multipliers.mhz)
		spectrum_bandwidth = self.up_convert(float(SPECTRUM_BANDWIDTH), self.multipliers.khz)
		half_spectrum_bandwidth = spectrum_bandwidth / 2

		# get our edge freqs
		lower_freq = SYSTEM_FREQS[0]
		upper_freq = SYSTEM_FREQS[-1]

		lower_edge = lower_freq - half_spectrum_bandwidth 
		upper_edge = upper_freq + half_spectrum_bandwidth

		# Get total bandwidth needed
		total_coverage_bandwidth = (upper_edge + half_spectrum_bandwidth) - (lower_edge - half_spectrum_bandwidth)

		# get radios needed
		# sdr_remainder = total_coverage_bandwidth / sdr_bandwidth
		# sdr_needed = int(math.ceil(sdr_remainder))

		# bandwith_per_sdr = total_coverage_bandwidth / sdr_needed
		# #bandwith_per_sdr = spectrum_bandwidth

		# leftover_bandwith = (sdr_bandwidth * sdr_needed) - total_coverage_bandwidth

		
		# Print out info on decoding
		logging.info(f"[+] Highest frequency - {self.down_convert(upper_freq, self.multipliers.mhz)}")
		logging.info(f"[-] Upper Limit - {self.down_convert(upper_edge, self.multipliers.mhz)}")
		logging.info(f"[+] Lowest frequency - {self.down_convert(lower_freq, self.multipliers.mhz)}")
		logging.info(f"[-] Lower Limit - {self.down_convert(lower_edge, self.multipliers.mhz)}")
		logging.info(f"[+] Total bandwidth to cover - {self.down_convert(total_coverage_bandwidth, self.multipliers.mhz)}")
			#logging.warning(f"[+] Total Leftover SDR bandwidth - {self.down_convert(leftover_bandwith, self.multipliers.mhz)}")
	
		# if SDR_BANDWIDTH:
		radios = self.do_a_math(SYSTEM_FREQS, half_spectrum_bandwidth, lower_edge, self.up_convert(float(MAX_SDR_BANDWIDTH), self.multipliers.mhz))
		
		logging.info(f"[+] Total Radios Needed - {str(len(radios))}")
		return {"bandwidth": self.up_convert(MAX_SDR_BANDWIDTH, self.multipliers.mhz), "results": radios}
		# else:		   
		#	 logging.warning("[+] Tring to find the right SDR bandwidth") 
		#	 results = []
		#	 for sdr_bandwidth_option in SDR_BANDWIDTH_OPTIONS:
		#		 radios = self.do_a_math(SYSTEM_FREQS, half_spectrum_bandwidth, lower_edge, self.up_convert(sdr_bandwidth_option, self.multipliers.mhz))
		#		 results.append({"bandwidth": sdr_bandwidth_option, "results": radios})

		#	 lowest_radio_count = 1e6
		#	 final_result = None
		#	 sorted_results = sorted(results, key=lambda item: item["bandwidth"], reverse=True)
		#	 for result in sorted_results:
		#		 if len(result["results"]) <= lowest_radio_count:
		#			 if debug:
		#				 logging.warning(f"[+] Found new best SDR Bandwidth - {self.up_convert(result['bandwidth'], self.multipliers.mhz)} - {len(result['results'])}") 
		#			 lowest_radio_count = len(radios)
		#			 final_result = result
		#	 return final_result



	def do_a_math(self, SYSTEM_FREQS, half_spectrum_bandwidth, lower_edge, sdr_bandwidth):
		
		radio_high_freq, indexed_channels, radio_index = 0, 0, 1
		# System Channel count minux one for zero index
		channels = len(SYSTEM_FREQS) 

		# Dict to hold our results
		radio_matrixes = {}

		# First system Freq minus half the spectrum BW
		lower_freq = int(SYSTEM_FREQS[0] - half_spectrum_bandwidth)
		# End of the useable radio range accounting for the half_spectrum_bandwidth
		max_sdr_useable_freq = int((lower_edge + half_spectrum_bandwidth) + sdr_bandwidth)

		# While loop to track if we have indexed all channels to radios
		while (indexed_channels < channels):

			# Channel Count
			sdr_channel_count = 0
			# Check if frquencies are near each other and assign to radios
			for freq in SYSTEM_FREQS:
				# If our frequency is within the bandwidth tolerance of the SDR
				if (freq > lower_freq) and (freq < max_sdr_useable_freq):
					# Checks if we have created the radio in the results dict yet (Avoids a key error)
					if not radio_index in radio_matrixes:
						radio_matrixes[radio_index] = {}
						radio_matrixes[radio_index]["freqs"] = []

					# Add matched frerquency to our radio's list
					radio_matrixes[radio_index]["freqs"].append(freq)
					# set last indexed Freq to our loops value
					radio_high_freq = freq

					# Increment our tracker counts for radio channels / Channels accounted for
					sdr_channel_count += 1
					indexed_channels += 1			

			# Set high and low and center and channel counts values for each radio
			radio_matrixes[radio_index]["high"] = radio_high_freq
			radio_matrixes[radio_index]["low"] = lower_freq
			radio_matrixes[radio_index]["channels"] = len(radio_matrixes[radio_index]["freqs"])
			radio_matrixes[radio_index]["center"] = int(self.calculate_center(lower_freq, radio_high_freq, SYSTEM_FREQS))

			# get the total bandwidth needing covered
			radio_sample_range = (radio_high_freq - lower_freq) + (half_spectrum_bandwidth * 2)


			if radio_sample_range < 900000:
				diff = 900000 - radio_sample_range
				radio_sample_range += diff

			# Check if the sample rate is valid
			is_divisable_by_eight = radio_sample_range % 8 == 0

			# Make the sample rate divisable by eight
			while not is_divisable_by_eight:
				radio_sample_range += 1
				is_divisable_by_eight = radio_sample_range % 8 == 0				


			radio_matrixes[radio_index]["sample_rate"] = radio_sample_range
			# incrment our radios - ie The next channel is beyond our bandwidth
			radio_index += 1

			# Check we havent reacherd the end of our channels
			if indexed_channels < channels:
				# Set to the next freq in the list minus half the spectrum BW
				lower_freq = int(SYSTEM_FREQS[indexed_channels] - half_spectrum_bandwidth)
				# Set to the max sdr reciveable bandwidth from the lower_freq
				max_sdr_useable_freq = int((lower_freq + half_spectrum_bandwidth) + sdr_bandwidth)
				#logging.warning(f"PREV: {lower_freq}  - NEXT: {max_sdr_useable_freq}")
			
		self.validate_coverage(radio_matrixes, SYSTEM_FREQS)
		return radio_matrixes

class trunk_recorder_helper:
	source_template = {
		"center": 0,
		"rate": 0,
		"ppm": 0,
		"gain": 49,
		"agc": False,
		"digitalRecorders": 4,
		"analogRecorders": 0,
		"driver": "osmosdr",
		"device": "rtl=00000101"
	}
	system_template =  {
		"control_channels": [
		],
		"type": "",
		"digitalLevels": 1,
		"talkgroupsFile": "",
		"shortName": "",
		"modulation": "",
		"hideEncrypted": False,
		"uploadScript": "",
		"talkgroupDisplayFormat": "id_tag",
		"compressWav": False,
	}
	base = {
		"ver": 2,
		"sources": [		 
		],
		"systems": [		   
		],
		"captureDir": "",
		"logLevel": "info",
		"broadcastSignals": True,
		"frequencyFormat": "mhz",
		"logFile": True,
		}

def main():
	main_freq_list = [851.125000,851.212500,851.750000,852.112500,852.262500,852.350000,852.512500,852.537500,852.612500,852.800000,852.825000,853.100000,853.137500,853.35000,853.687500,853.712500]
	#main_freq_list = [851.000,853.230,853.550,853.750,853.850]
	TR = tr_autotune()

	SPECTRUM_BANDWIDTH = 25
	PRINT_RADIO_SPACING = True
	PRINT_DATA = True
	SAMPLE_RATE = 2.4
	FIXED_SAMPLE_RATE = None
	
	result = TR.find_freqs(main_freq_list, SAMPLE_RATE, SPECTRUM_BANDWIDTH)
	if PRINT_RADIO_SPACING:
		print(json.dumps(result, indent=4))

	sources = []
	for radio_index in result["results"]:
		payload = deepcopy(trunk_recorder_helper.source_template)

		payload["center"] = result["results"][radio_index]["center"]
		if FIXED_SAMPLE_RATE:
			payload["rate"] = int(TR.up_convert(FIXED_SAMPLE_RATE, TR.multipliers.mhz))
		else:
			payload["rate"] = int(result["results"][radio_index]["sample_rate"])
		payload["device"] = f"rtl={str(radio_index-1)}"
		payload["digitalRecorders"] = result["results"][radio_index]["channels"]
		sources.append(payload)

	if PRINT_DATA:
		print(json.dumps(sources, indent=4))
				
	logging.warning("[+] TR CONFIGURATOR HAS FINISHED")

if __name__ == "__main__":
	main()
