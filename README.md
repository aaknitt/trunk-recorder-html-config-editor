# trunk-recorder-html-config-editor
A browser-based configuration editor for [trunk-recorder](https://github.com/robotastic/trunk-recorder) JSON config files.  Can be opened by a browser on computer that trunk-recorder is running with no need for a web server (though it does need to be online to pull in required javascript libraries used by the GUI).  

Relies heavily on the [json-editor project](https://github.com/json-editor/json-editor) and the javascript [file system access API](https://web.dev/file-system-access/)

![screenshot](/images/screenshot.PNG)

## Usage

Simply copy the .html and .js files onto the local file systems of the computer running trunk-recorder.  Open the HTML in a modern web browser on the same computer.  Use the Open button to read in an existing trunk-recorder configuration file and the Save As button to save changes.  

When the "Show Advanced Settings" is set to "false", only a subset of trunk-recorder configuration settings are shown.  Change this value to "true" to see all settings.  **Note:** The visibility of certain settings is dependant on other settings.  For example, settings related to SmartNet systems will only be visible if the "System Type" setting is set to "smartnet".  

## Making Modifications

The HTML form is rendered entirely from the information contained in the settings_and_schema.js file.  Edit this file to change the fields that are available, default values, behaviors, etc.  More information on how the contents of the file alter the contents and behavior of the HTML form can be found in the [json-editor project](https://github.com/json-editor/json-editor) documentation.  

**Note:**  Which settings are considered "Advanced"  is somewhat arbritrary.  Feel free to make suggestions for improvements.  
