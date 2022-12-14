editor_config = {
  "ajax": true,
  "theme": "spectre",
  "required_by_default": 0,
  "no_additional_properties": 1,
  "disable_properties": 1,
  "remove_empty_properties": 1,
  "iconlib": "spectre",
  "schema": {
    "type": "object",
    "title": "trunk-recorder configuration",
    "properties": {
      "showAdvanced": {
        "title": "Show Advanced Settings",
        "type": "boolean",
        "format":"checkbox",
        "default": false
      },
      "ver": {
        "title": "Config File Version",
        "type": "number",
        "default": 2,
        "advanced": true,
      },
      "defaultMode": {
        "title": "Default Mode",
        "type": "string",
        "enum": [
          "analog",
          "digital"
        ],
        "default": "digital",
      },
      "captureDir": {
        "title": "Audio Capture Directory Path",
        "type": "string",
        "default": "",
      },
      "logFile": {
        "title": "Save Log File",
        "type": "boolean",
        "format":"checkbox",
        "default": true,
      },
      "frequencyFormat": {
        "title": "Frequency display format",
        "type": "string",
        "enum": [
          "mhz",
          "hz",
          "exp"
        ],
        "advanced": true,
        "options": {
          "enum_titles": [
            "MHz",
            "Hz",
            "Exponential Hz"
          ],
        },
        "default": "mhz"
      },
      "callTimeout": {
        "type": "number",
        "default": 3,
        "advanced": true,
      },
      "controlWarnRate": {
        "type": "number",
        "default": 10,
        "advanced": true,
      },
      "statusAsString": {
        "type": "boolean",
        "format":"checkbox",
        "default": true,
        "advanced": true,
      },
      "statusServer": {
        "title": "Status Server URL",
        "type": "string",
        "advanced": true,
      },
      "broadcastSignals": {
        "title": "Broadcast Decoded Signals to Status Server",
        "type": "boolean",
        "format":"checkbox",
        "default": true,
        "advanced": true,
      },
      "logLevel": {
        "title": "Log Level",
        "type": "string",
        "enum": [
          "trace",
          "debug",
          "info",
          "warning",
          "error",
          "fatal"
        ],
        "advanced": true,
        "default": "info",
      },
      "uploadServer": {
        "title": "OpenMHz upload URL",
        "type": "string",
      },
      "debugRecorder": {
        "title": "Attach debug recorder to each source",
        "type": "boolean",
        "format":"checkbox",
        "default": true,
        "advanced": true,
      },
      "debugRecorderPort": {
        "title": "Debug Recorder Port",
        "type": "number",
        "default": 1234,
        "advanced": true,
      },
      "debugRecorderAddress": {
        "title": "Debug Recorder IP Address",
        "type": "string",
        "default": "127.0.0.1",
        "advanced": true,
      },
      "audioStreaming": {
        "title": "Enable Live Audio Streaming",
        "type": "boolean",
        "format":"checkbox",
        "default": false,
        "advanced": true,
      },
      "systems": {
        "title": "Radio Systems",
        "type": "array",
        "minItems": 1,
        "format": "array",
        "items": {
          "type": "object",
          "title": "System",
          "id": "sys_item",
          "properties": {
            "shortName": {
              "title": "System Name",
              "type": "string",
              "default": "TrunkedSystem"
            },
            "type": {
              "title": "System Type",
              "type": "string",
              "enum": [
                "smartnet",
                "p25",
                "conventional",
                "conventionalDMR",
                "conventionalP25"
              ],
              "default": "p25",
              "options": {
                "enum_titles": [
                  "SmartNet Trunking",
                  "P25 Trunking",
                  "Analog Conventional",
                  "P25 Conventional",
                  "DMR Conventional"
                ],
              },
            },
            "talkgroupsFile": {
              "title": "Talkgroups CSV Filename",
              "type": "string",
            },
            "control_channels": {
              "options": {
                "dependencies": {
                  "type": [
                    "smartnet",
                    "p25"
                  ]
                }
              },
              "type": "array",
              "minItems": 1,
              "title": "Trunked Control Channel Frequencies (MHz)",
              "description": "Add all Primary and Alternate control channel frequencies for the trunked radio system here.",
              "format": "array",
              "items": {
                "type": "number",
                "title": "Control Channel Frequency (MHz)"
              }
            },
            "voice_channels": {
              "options": {
                "dependencies": {
                  "type": [
                    "smartnet",
                    "p25"
                  ]
                }
              },
              "type": "array",
              "minItems": 1,
              "title": "Trunked Voice Channel Frequencies (MHz)",
              "description":"Add voice channel frequencies from the trunked radio system here. These are not used by trunk-recorder directly, but are used to auto-calculate the RF Source information.  If you are unsure whether a channel is a Voice channel or a Control channel, enter it as Control Channel area above",
              "format": "array",
              "items": {
                "type": "number",
                "title": "Voice Channel Frequency (MHz)"
              }
            },
            "channels": {
              "options": {
                "dependencies": {
                  "type": [
                    "conventional",
                    "conventionalDMR",
                    "conventionalP25"
                  ]
                }
              },
              "type": "array",
              "title": "Conventional Frequencies (MHz)",
              "format": "array",
              "items": {
                "type": "number",
                "title": "Conventional Frequency (MHz)"
              }
            },
            "channelFile": {
              "title": "Conventional Channel CSV File",
              "type": "string",
              "options": {
                "dependencies": {
                  "type": [
                    "conventional",
                    "conventionalDMR",
                    "conventionalP25"
                  ]
                }
              }
            },
            "modulation": {
              "title": "Modulation Type",
              "type": "string",
              "enum": [
                "qpsk",
                "fsk4"
              ],
              "default": "qpsk",
              "advanced": true,
            },
            "squelch": {
              "title": "Squelch",
              "type": "number",
              "default": -160,
              "options": {
                "dependencies": {
                  "type": [
                    "conventional",
                    "conventionalP25",
                    "conventionalDMR",
                    "smartnet"
                  ]
                }
              }
            },
            "apiKey": {
              "title": "OpenMHz API Key",
              "type": "string",
            },
            "broadcastifyApiKey": {
              "title": "Broadcastify API Key",
              "type": "string",
            },
            "broadcastifySystemId": {
              "title": "Broadcastify System ID",
              "type": "number",
            },
            "uploadScript": {
              "title": "Upload Script",
              "type": "string",
              "default":"uploadSocketSender",
            },
            "compressWav": {
              "title": "Compress WAV files to M4A",
              "type": "boolean",
              "format":"checkbox",
              "default": true,
              "advanced": true,
            },
            "unitScript": {
              "title": "Unit Script",
              "type": "string",
              "default":"unitSocketSender",
              "advanced": true,
            },
            "audioArchive": {
              "title": "Save Audio Files After Upload",
              "type": "boolean",
              "format":"checkbox",
              "default": true,
            },
            "transmissionArchive": {
              "title": "Save Individual Transmission Files After Upload",
              "type": "boolean",
              "format":"checkbox",
              "default": false,
              "advanced": true,
            },
            "callLog": {
              "title": "Save call JSON data after upload",
              "type": "boolean",
              "format":"checkbox",
              "default": true,
            },
            "analogLevels": {
              "title": "Analog Audio Amplification Level",
              "type": "number",
              "default": 8,
            },
            "maxDev": {
              "title": "Analog Max Deviation",
              "type": "number",
              "default": 4000,
              "advanced": true,
            },
            "digitalLevels": {
              "title": "Digital Audio Amplification Level",
              "type": "number",
              "default": 1,
            },
            "unitTagsFile": {
              "title": "Unit Tags CSV Filename",
              "type": "string",
            },
            "recordUnknown": {
              "title": "Record Unknown Talkgroups",
              "type": "boolean",
              "format":"checkbox",
              "default": true,
            },
            "recordUUVCalls": {
              "title": "Record P25 Unit to Unit Calls",
              "type": "boolean",
              "format":"checkbox",
              "default": true,
              "advanced": true,
            },
            "hideEncrypted": {
              "title": "Hide Encrypted Talkgroup Log Entries",
              "type": "boolean",
              "format":"checkbox",
              "default": false,
              "advanced": true,
            },
            "hideUnknownTalkgroups": {
              "title": "Hide Unknown Talkgroup Log Entries",
              "type": "boolean",
              "format":"checkbox",
              "default": false,
              "advanced": true,
            },
            "minDuration": {
              "title": "Minimum Call Duration To Upload and Save (sec)",
              "type": "number",
              "default": 0,
              "advanced": true,
            },
            "minTransmissionDuration": {
              "title": "Minimum Transmission Duration To Add To Call",
              "type": "number",
              "default": 0,
              "advanced": true,
            },
            "talkgroupDisplayFormat": {
              "title": "Talkgroup ID Display Format",
              "type": "string",
              "enum": [
                "id",
                "id_tag",
                "tag_id"
              ],
              "default": "id_tag",
              "advanced": true,
            },
            "bandplan": {
              "title": "SmartNet Bandplan",
              "options": {
                "dependencies": {
                  "type": [
                    "smartnet"
                  ]
                }
              },
              "type": "string",
              "enum": [
                "800_standard",
                "800_reband",
                "800_splinter",
                "400_custom"
              ],
              "default": "800_standard"
            },
            "bandplanBase": {
              "title": "Bandplan Base Frequency (MHz)",
              "type": "number",
              "options": {
                "dependencies": {
                  "bandplan": [
                    "400_custom"
                  ],
                  "type": [
                    "smartnet"
                  ]
                }
              }
            },
            "bandplanHigh": {
              "title": "Bandplan High Frequency (MHz)",
              "type": "number",
              "options": {
                "dependencies": {
                  "bandplan": [
                    "400_custom"
                  ],
                  "type": [
                    "smartnet"
                  ]
                }
              }
            },
            "bandplanSpacing": {
              "title": "Bandplan Spacing (MHz)",
              "type": "number",
              "default": 25000,
              "options": {
                "dependencies": {
                  "bandplan": [
                    "400_custom"
                  ],
                  "type": [
                    "smartnet"
                  ]
                }
              }
            },
            "bandplanOffset": {
              "title": "Bandplan Offset (MHz)",
              "type": "number",
              "options": {
                "dependencies": {
                  "bandplan": [
                    "400_custom"
                  ],
                  "type": [
                    "smartnet"
                  ]
                }
              }
            },
            "decodeMDC": {
              "title": "Enable MDC1200 Decoder",
              "type": "boolean",
              "format":"checkbox",
              "default": false,
              "options": {
                "dependencies": {
                  "type": [
                    "conventional"
                  ]
                }
              }
            },
            "decodeFSync": {
              "title": "Enable FleetSync Decoder",
              "type": "boolean",
              "format":"checkbox",
              "default": false,
              "options": {
                "dependencies": {
                  "type": [
                    "conventional"
                  ]
                }
              }
            },
            "decodeStar": {
              "title": "Enable Star Decoder",
              "type": "boolean",
              "format":"checkbox",
              "default": false,
              "options": {
                "dependencies": {
                  "type": [
                    "conventional"
                  ]
                }
              }
            },
            "decodeTPS": {
              "title": "Enable Motorola Tactical Public Safety Decoder",
              "type": "boolean",
              "format":"checkbox",
              "default": false,
              "options": {
                "dependencies": {
                  "type": [
                    "conventional"
                  ]
                }
              }
            }
          }
        }
      },
      "source_autogen_button":{
        "type": "button",
          "title": "Auto Generate RTL-SDR Source Parameters From System Channels",
          "options": {
            "button": {
              "action": "autoGenSourceParams",
              "validated": false
            }
          }
      },
      "sources": {
        "title": "RF Sources",
        "type": "array",
        "format": "array",
        "id":"source_item",
        "minItems": 1,
        "items": {
          "type": "object",
          "title": "Source",
          "properties": {
            "center": {
              "title": "Center frequency of source (MHz)",
              "type": "number"
            },
            "rate": {
              "title": "SDR Sampling Rate (MHz)",
              "type": "number",
              "default":2400000
            },
            "error": {
              "title": "SDR Tuning Error (Hz)",
              "type": "number",
              "default": 0,
              "advanced": true,
            },
            "gain": {
              "title": "SDR RF Gain (dB)",
              "type": "number",
              "default":40
            },
            "digitalRecorders": {
              "title": "Number of Digital Recorders to allocate to this Source",
              "type": "number",
              "default":2
            },
            "analogRecorders": {
              "title": "Number of Analog Recorders to allocate to this Source",
              "type": "number",
            },
            "driver": {
              "title": "GNU Radio Driver",
              "type": "string",
              "enum": [
                "usrp",
                "osmosdr"
              ],
              "default": "osmosdr",
            },
            "device": {
              "title": "OsmoSDR device name or serial number",
              "type": "string",
              "default": "rtl=0",
            },
            "ppm": {
              "title": "SDR Tuning Error (PPM)",
              "type": "number",
              "default": 0,
            },
            "agc": {
              "title": "Use SDR Automatic Gain Control (AGC)",
              "type": "boolean",
              "format":"checkbox",
              "default": false,
              "advanced": true,
            }
          }
        }
      },
      "plugins": {
        "title": "trunk-recorder Plugins",
        "type": "array",
        "advanced": true,
        "items": {
          "title": "Plugin",
          "oneOf": [
            {
              "type": "object",
              "title": "simplestream",
              "properties": {
                "library": {
                  "title": "Plugin library filename",
                  "type": "string",
                  "const": "libsimplestream.so",
                  "required": true,
                  "default": "libsimplestream.so"
                },
                "name": {
                  "title": "Plugin Name",
                  "type": "string",
                  "required": true,
                  "const": "simplestream",
                  "default": "simplestream"
                },
                "streams": {
                  "title": "Streams",
                  "type": "array",
                  "format": "array",
                  "items": {
                    "type": "object",
                    "title": "Stream",
                    "properties": {
                      "shortName": {
                        "title": "shortName of System",
                        "type": "string",
                        "required": true
                      },
                      "address": {
                        "title": "IP address to stream audio to",
                        "type": "string",
                        "default": "127.0.0.1",
                        "required": true
                      },
                      "port": {
                        "title": "Port to stream audio to",
                        "type": "number",
                        "required": true
                      },
                      "TGID": {
                        "title": "Talkgroup ID to Stream",
                        "type": "number",
                        "required": true
                      },
                      "sendTGID": {
                        "title": "Add TGID to audio stream",
                        "type": "boolean",
                        "format":"checkbox",
                        "default": false
                      },
                      "useTCP": {
                        "title": "Stream via TCP instead of UDP",
                        "type": "boolean",
                        "format":"checkbox",
                        "default": false
                      }
                    }
                  }
                }
              }
            },
            {
              "type": "object",
              "title": "rdio-scanner",
              "properties": {
                "name": {
                  "title": "Plugin Name",
                  "type": "string",
                  "required": true,
                  "default": "rdioscanner_uploader",
                  "const": "rdioscanner_uploader"
                },
                "library": {
                  "title": "Library Filename",
                  "type": "string",
                  "required": true,
                  "default": "librdioscanner_uploader.so",
                  "const": "librdioscanner_uploader.so"
                },
                "server": {
                  "title": "Rdio-Scanner Server URL",
                  "type": "string",
                  "required": true
                },
                "systems": {
                  "title": "Systems",
                  "type": "array",
                  "format": "array",
                  "items": {
                    "type": "object",
                    "title": "System",
                    "properties": {
                      "shortName": {
                        "title": "System shortName",
                        "type": "string",
                        "required": true
                      },
                      "systemId": {
                        "title": "Rdio-Scanner System ID",
                        "type": "number",
                        "required": true
                      },
                      "apiKey": {
                        "title": "Radio-Scanner API Key",
                        "type": "string",
                        "required": true
                      }
                    }
                  }
                }
              }
            }
          ]
        }
      }
    }
  }
};