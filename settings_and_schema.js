editor_config = {
  "ajax": true,
  "theme": "spectre",
  "required_by_default": 0,
  "no_additional_properties": 1,
  "disable_properties": 1,
  "remove_empty_properties": 0,
  "iconlib": "spectre",
  "schema": {
    "type": "object",
    "title": "trunk-recorder configuration",
    "properties": {
      "showAdvanced": {
        "title": "Show Advanced Settings",
        "type": "boolean",
        "default": false
      },
      "ver": {
        "title": "Config File Version",
        "type": "number",
        "default": 2,
        "options": {
          "dependencies": {
            "showAdvanced": true
          }
        }
      },
      "defaultMode": {
        "title": "Default Mode",
        "type": "string",
        "enum": [
          "analog",
          "digital"
        ],
        "default": "digital"
      },
      "captureDir": {
        "title": "Audio Capture Directory Path",
        "type": "string"
      },
      "logFile": {
        "title": "Save Log File",
        "type": "boolean",
        "default": false
      },
      "frequencyFormat": {
        "title": "Frequency display format",
        "type": "string",
        "enum": [
          "mhz",
          "hz",
          "exp"
        ],
        "options": {
          "enum_titles": [
            "MHz",
            "Hz",
            "Exponential Hz"
          ],
          "dependencies": {
            "showAdvanced": true
          }
        },
        "default": "exp"
      },
      "callTimeout": {
        "type": "number",
        "default": 3,
        "options": {
          "dependencies": {
            "showAdvanced": true
          }
        }
      },
      "controlWarnRate": {
        "type": "number",
        "default": 10,
        "options": {
          "dependencies": {
            "showAdvanced": true
          }
        }
      },
      "statusAsString": {
        "type": "boolean",
        "default": true,
        "options": {
          "dependencies": {
            "showAdvanced": true
          }
        }
      },
      "statusServer": {
        "title": "Status Server URL",
        "type": "string",
        "options": {
          "dependencies": {
            "showAdvanced": true
          }
        }
      },
      "broadcastSignals": {
        "title": "Broadcast Decoded Signals to Status Server",
        "type": "boolean",
        "default": true,
        "options": {
          "dependencies": {
            "showAdvanced": true
          }
        }
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
        "default": "info"
      },
      "uploadServer": {
        "title": "OpenMHz upload URL",
        "type": "string"
      },
      "debugRecorder": {
        "title": "Attach debug recorder to each source",
        "type": "boolean",
        "default": true,
        "options": {
          "dependencies": {
            "showAdvanced": true
          }
        }
      },
      "debugRecorderPort": {
        "title": "Debug Recorder Port",
        "type": "number",
        "default": 1234,
        "options": {
          "dependencies": {
            "showAdvanced": true
          }
        }
      },
      "debugRecorderAddress": {
        "title": "Debug Recorder IP Address",
        "type": "string",
        "default": "127.0.0.1",
        "options": {
          "dependencies": {
            "showAdvanced": true
          }
        }
      },
      "audioStreaming": {
        "title": "Enable Live Audio Streaming",
        "type": "boolean",
        "default": false,
        "options": {
          "dependencies": {
            "showAdvanced": true
          }
        }
      },
      "sources": {
        "title": "RF Sources",
        "type": "array",
        "format": "array",
        "items": {
          "type": "object",
          "title": "Source",
          "properties": {
            "center": {
              "title": "Center frequency of source (Hz)",
              "type": "number"
            },
            "rate": {
              "title": "SDR Sampling Rate (Hz)",
              "type": "number"
            },
            "error": {
              "title": "SDR Tuning Error (Hz)",
              "type": "number",
              "default": 0,
              "options": {
                "dependencies": {
                  "showAdvanced": true
                }
              }
            },
            "gain": {
              "title": "SDR RF Gain (dB)",
              "type": "number"
            },
            "digitalRecorders": {
              "title": "Number of Digital Recorders to allocate to this Source",
              "type": "number"
            },
            "analogRecorders": {
              "title": "Number of Analog Recorders to allocate to this Source",
              "type": "number"
            },
            "driver": {
              "title": "GNU Radio Driver",
              "type": "string",
              "enum": [
                "usrp",
                "osmosdr"
              ],
              "default": "osmosdr"
            },
            "device": {
              "title": "OsmoSDR device name or serial number",
              "type": "string"
            },
            "ppm": {
              "title": "SDR Tuning Error (PPM)",
              "type": "number",
              "default": 0,
              "options": {
                "dependencies": {
                  "showAdvanced": true
                }
              }
            },
            "agc": {
              "title": "Use SDR Automatic Gain Control (AGC)",
              "type": "boolean",
              "default": false,
              "options": {
                "dependencies": {
                  "showAdvanced": true
                }
              }
            }
          }
        }
      },
      "systems": {
        "title": "Radio Systems",
        "type": "array",
        "format": "array",
        "items": {
          "type": "object",
          "title": "System",
          "properties": {
            "shortName": {
              "type": "string"
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
              "default": "p25"
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
              "title": "Trunked Control Channel Frequencies (Hz)",
              "format": "array",
              "items": {
                "type": "number",
                "title": "Control Channel Frequency (Hz)"
              }
            },
            "channels": {
              "options": {
                "dependencies": {
                  "type": [
                    "conventional",
                    "conventinalDMR",
                    "conventionalP25"
                  ]
                }
              },
              "type": "array",
              "title": "Conventional Frequencies (Hz)",
              "format": "array",
              "items": {
                "type": "number",
                "title": "Conventional Frequency (Hz)"
              }
            },
            "channelFile": {
              "title": "Conventional Channel CSV File",
              "type": "string",
              "options": {
                "dependencies": {
                  "type": [
                    "conventional",
                    "conventinalDMR",
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
              "options": {
                "dependencies": {
                  "showAdvanced": true
                }
              }
            },
            "squelch": {
              "title": "Squelch",
              "type": "number",
              "default": -160
            },
            "talkgroupsFile": {
              "title": "Talkgroups CSV Filename",
              "type": "string"
            },
            "apiKey": {
              "title": "OpenMHz API Key",
              "type": "string"
            },
            "broadcastifyApiKey": {
              "title": "Broadcastify API Key",
              "type": "string"
            },
            "broadcastifySystemId": {
              "title": "Broadcastify System ID",
              "type": "number"
            },
            "uploadScript": {
              "title": "Upload Script",
              "type": "string"
            },
            "compressWav": {
              "title": "Compress WAV files to M4A",
              "type": "boolean",
              "default": true,
              "options": {
                "dependencies": {
                  "showAdvanced": true
                }
              }
            },
            "unitScript": {
              "title": "Unit Script",
              "type": "string"
            },
            "audioArchive": {
              "title": "Save Audio Files After Upload",
              "type": "boolean",
              "default": true
            },
            "transmissionArchive": {
              "title": "Save Individual Transmission Files After Upload",
              "type": "boolean",
              "default": false,
              "options": {
                "dependencies": {
                  "showAdvanced": true
                }
              }
            },
            "callLog": {
              "title": "Save call JSON data after upload",
              "type": "boolean",
              "default": false,
              "options": {
                "dependencies": {
                  "showAdvanced": true
                }
              }
            },
            "analogLevels": {
              "title": "Analog Audio Amplification Level",
              "type": "number",
              "default": 8
            },
            "maxDev": {
              "title": "Analog Max Deviation",
              "type": "number",
              "default": 4000,
              "options": {
                "dependencies": {
                  "showAdvanced": true
                }
              }
            },
            "digitalLevels": {
              "title": "Digital Audio Amplification Level",
              "type": "number",
              "default": 1
            },
            "unitTagsFile": {
              "title": "Unit Tags CSV Filename",
              "type": "string"
            },
            "recordUnknown": {
              "title": "Record Unknown Talkgroups",
              "type": "boolean",
              "default": true
            },
            "recordUUVCalls": {
              "title": "Record P25 Unit to Unit Calls",
              "type": "boolean",
              "default": true
            },
            "hideEncrypted": {
              "title": "Hide Encrypted Talkgroup Log Entries",
              "type": "boolean",
              "default": false
            },
            "hideUnknownTalkgroups": {
              "title": "Hide Unknown Talkgroup Log Entries",
              "type": "boolean",
              "default": false
            },
            "minDuration": {
              "title": "Minimum Call Duration To Upload and Save (sec)",
              "type": "number",
              "default": 0
            },
            "minTransmissionDuration": {
              "title": "Minimum Transmission Duration To Add To Call",
              "type": "number",
              "default": 0
            },
            "talkgroupDisplayFormat": {
              "title": "Talkgroup ID Display Format",
              "type": "string",
              "enum": [
                "id",
                "id_tag",
                "tag_id"
              ],
              "default": "id",
              "options": {
                "dependencies": {
                  "showAdvanced": true
                }
              }
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
              "title": "Bandplan Base Frequency (Hz)",
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
              "title": "Bandplan High Frequency (Hz)",
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
              "title": "Bandplan Spacing (Hz)",
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
              "title": "Bandplan Offset",
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
              "default": "false",
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
              "default": "false",
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
              "default": "false",
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
              "default": "false",
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
      "plugins": {
        "title": "trunk-recorder Plugins",
        "type": "array",
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
                        "default": false
                      },
                      "useTCP": {
                        "title": "Stream via TCP instead of UDP",
                        "type": "boolean",
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