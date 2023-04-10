# pp-metadataDropdown-pcf

This is PCF control with dynamcic data quyiryng functioonality. It gives the ooportunity to create custom lookup to render the metadata dropdown such as: enitites,publishers,solutions.

It really helpfut when you would like to create custom configuration page.

## Configururation
### Input config
|Name|Description|Required|Example|
|---|---|---|---|
|Endpoint|Logical Name of the entity|true|`publisher`|
|Options|`$select` and `$filter` part of the API request|true| `?$select=friendlyname,,customizationprefix,publisherid`|
|Field Name Key|Name of the record unique identifier|true|`publisherid`|
|Field Name Text|Name of the record Display Name|true|`friendlyname`|
|Text Field Template|Template of the Display Name, supporting values from the record |false|`{{friendlyname}} ({{customizationprefix}})`|

### Output parameter
The output of the control is the record unique identifier, guid.


## Images
![exapmle](/img/pcf-example.png)
![exapmle config](/img/pcf-settings.png)

## Implemented

- styles of the disabled control
- autocomplete
- 