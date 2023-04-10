# pp-metadataDropdown-pcf

This is `virtual` PCF control with dynamic data querying functionality based on Dataverse Web API. It allows creating a custom lookup to render the metadata dropdown such as entities, publishers, and solutions.

It really helps when you would like to create a custom configuration page.

## Configururation

### Input config
|Name|Description|Required|Example|
|---|---|---|---|
|Endpoint|Logical Name of the entity|true|`publisher`|
|Options|`$select` and `$filter` part of the API request|true| `?$select=friendlyname,customizationprefix,publisherid`|
|Field Name Key|Name of the record unique identifier|true|`publisherid`|
|Field Name Text|Name of the record Display Name|true|`friendlyname`|
|Text Field Template|Template of the Display Name, supporting values from the record |false|`{{friendlyname}} ({{customizationprefix}})`|

### Output parameter
The output of the control is the record unique identifier, guid.


## Images
### Example
![exapmle](/img/pcf-example.png)
### Config example
![exapmle config](/img/pcf-settings.png)

## Implemented
- Styles of the disabled control
- Autocomplete
- Render selected value
- Empty field placeholder: `---`