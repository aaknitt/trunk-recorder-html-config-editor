function calc_sdr_params(all_freqs_array,sdr_bw,channel_bw){
	all_freqs_array = [...new Set(all_freqs_array)];  //remove duplicates
	all_freqs_array = all_freqs_array.sort(function (a, b) {  return a - b;  });  //sort numerically
	console.log(all_freqs_array);

	half_spectrum_bandwidth = channel_bw / 2;

	// get our edge freqs
	lower_freq = all_freqs_array[0];
	upper_freq = all_freqs_array[all_freqs_array.length-1];

	lower_edge = lower_freq - half_spectrum_bandwidth;
	upper_edge = upper_freq + half_spectrum_bandwidth;
	
	radio_high_freq = 0;
	indexed_channels = 0;
	//System Channel count minux one for zero index
	channels = all_freqs_array.length;

	num_radios = 1;

	//End of the useable radio range accounting for the half_spectrum_bandwidth
	max_sdr_useable_freq = (lower_edge  + sdr_bw - half_spectrum_bandwidth);

	//While loop to track if we have indexed all channels to radios
	radio_lower_freq = lower_edge;
	while (indexed_channels < channels){
	  all_freqs_array.forEach(function(freq,index){
		//If our frequency is within the bandwidth tolerance of the SDR
		if ((freq > radio_lower_freq) && (freq < max_sdr_useable_freq)){
			//set last indexed Freq to our loops value
			radio_high_freq = freq;
			//Increment our tracker counts for channels accounted for
			indexed_channels += 1;
		}
	  });
	  //Check we havent reacherd the end of our channels
	  if (indexed_channels < channels){
		//Set to the next freq in the list minus half the spectrum BW
		radio_lower_freq = all_freqs_array[indexed_channels] - half_spectrum_bandwidth;
		//Set to the max sdr reciveable bandwidth from the lower_freq
		max_sdr_useable_freq = (radio_lower_freq + half_spectrum_bandwidth) + sdr_bw;
		num_radios += 1;
	  }
	}
	console.log(num_radios + " SDRs will be needed");
	
	//Calculate diff of frequency list - used to find size of gaps between frequencies
	diff = []
	all_freqs_array.forEach(function(val,i){
	  if (i < all_freqs_array.length-1){
		diff.push(all_freqs_array[i+1] - all_freqs_array[i])
	  }
	});
	//find indices of N highest values in diff
	console.log(diff)
	sorted_diff = [...diff].sort(function (a, b) {  return b - a;  });  //sort numerically descending
	topN = sorted_diff.slice(0, num_radios-1);
	topNindices = []
	diff.forEach(function(val,i){
	  if (topN.includes(val)){
		topNindices.push(i+1);
	  }
	});

	//use indices of N highest values in diff to split frequency list into groups - one group per SDR
	groups = []
	if(num_radios > 1){
	  topNindices.forEach(function(indexN,i){
		if (i == 0){
		  groups.push(all_freqs_array.slice(0,indexN));
		  groups.push(all_freqs_array.slice(indexN,topNindices[i+1]));
		}
		else if (i == topNindices.length-1){
		  groups.push(all_freqs_array.slice(indexN,all_freqs_array.length));
		}
		else{
		  groups.push(all_freqs_array.slice(indexN,topNindices[i+1]));
		}
	  });
	}
	else {
	  groups = [[...all_freqs_array]];
	}
	console.log(groups)
	radio_matrixes = {}
	groups.forEach(function(freq_group,i){
	  //Set high and low and center and channel counts values for each radio
	  radio_high_freq = freq_group[freq_group.length-1] + half_spectrum_bandwidth;
	  radio_lower_freq = freq_group[0] - half_spectrum_bandwidth;
	  radio_matrixes[i] = {};
	  radio_matrixes[i]["high"] = radio_high_freq;
	  radio_matrixes[i]["low"] = radio_lower_freq;
	  radio_matrixes[i]["num_channels"] = freq_group.length;
	  radio_matrixes[i]["channels"] = freq_group;
	  
	  //calculate_center
	  center = (radio_lower_freq + radio_high_freq)/2;
	  rounding_change = .0100000 // in MHZ
	  bad_center = false;
	  console.log(freq_group);
	  freq_group.forEach(function(freq,index){
		//Check if our center freq is too close
		if (freq - rounding_change <= center <= freq + rounding_change){
		  bad_center = true;
		}
		if (bad_center){
		  center = center + rounding_change;
		}
	  });
	  center = center.toFixed(6);
	  radio_matrixes[i]["center"] = center;

	  //get the total bandwidth needing covered
	  radio_sample_range = (radio_high_freq - radio_lower_freq) + (half_spectrum_bandwidth * 2);

	  if (radio_sample_range < .900000){
		diff = .900000 - radio_sample_range;
		radio_sample_range += diff;
	  }

	  //Check if the sample rate is valid
	  radio_sample_range = Math.round(radio_sample_range*1e6)
	  console.log(radio_sample_range);
	  is_divisable_by_eight = radio_sample_range % 8 == 0;

	  //Make the sample rate divisable by eight
	  
	  while (!is_divisable_by_eight){
		radio_sample_range += 1;
		is_divisable_by_eight = radio_sample_range % 8 == 0;
	  }
	  radio_sample_range = radio_sample_range/1e6;
	  console.log(radio_sample_range);
	  radio_matrixes[i]["sample_rate"] = radio_sample_range;
	});
	console.log(radio_matrixes);
	return radio_matrixes;

}