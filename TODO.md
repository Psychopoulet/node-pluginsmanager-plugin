@TODO

* 3.1.0
- checkDescriptor : forbid empty "requestBody" or "parameters"
- checkDescriptor : limit "in" attribute of "parameter" to [ "query", "header", "path", "cookie" ]
- checkDescriptor : force "schema" of "requestBody" to be an object
- checkParameters/extractBodyParams : extract by reference
- checkParameters/extractBodyParams : extract recursively

* 3.2.0
- automaticly check request format (error 406 ?)
- automaticly check returned data & response format
