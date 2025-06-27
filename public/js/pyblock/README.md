# Python Code Converter

This is a JavaScript library that converts Python code into Blockly XML representation. It provides an API function `PyBlock.prototype.convert` to perform the conversion.


## Steps to Add a New Function

1. Insert the Python code into the `test/index.html` page, execute it, and check the type of the generated block.
2. Navigate to the file containing the function `PyBlock.prototype["block_type"]` to see if the block is of type `ast_Call`. Refer to the "Assigning a Function to a Block" section in this case.
3. If not, modify the function to create a block of the desired type and shape using the `PyBlock.create_block` function. Refer to the "Creating a Block" section.

Tip: In the `PyBlock.prototype["block_type"]` function, using `console.log(node)` can help you identify the values you want to retrieve. Remember to remove them before pushing your code.

## Adding a Block as a "Top-level Block"

A top-level block refers to a block like a definition of function or "start" blocks. To add a block as a top-level block, add the function name to the `TOP_LEVEL_BLOCKS` list.

## Unnecessary to Remove

All the `Blockly.Python` and `PyBlock.BLOCKS` functions because we don't create new Blockly blocks, but rather use the existing ones.

## Helper Functions for Creating Blocks

### Getting Blocks for Subsequent Nodes
`PyBlock.prototype.convert(node, node_parent)`

### Creating a Block
`PyBlock.create_block(type, line_number, python_type, fields, values, settings, mutations, statements)`

A function to create a Blockly XML representation.

- type - Type of block to create.
- linenumber - the bunber of the line of the block
- python_type - Associated Python block type (optional).
- fields - Values of the block's fields.
- values - Values of the "value" type blocks linked to the current block.
- settings - Additional parameters of the block.
- mutations - Mutations of the block (optional).
- statements - Statement blocks linked to the current block (optional).

Return the created block element.


#### Deal with the arguments :

##### Fields argument

Values of the block's fields.

An object of the form:

```js
{
    "example": 1,
    "example2": "a_value"
}
```

This will produce:

```xml
<field name="example">1</field>
<field name="example2">a_value</field>
```

##### Values argument

Values of the "value" type blocks linked to the current block
```js
{
    "example": un_objet_block_en_xml
}
```

Will produce: `<value name="example">un_objet_block_en_xml</value>`

##### Settings argument

Additional parameters of the block.
```js
{
    "example": 1
}
```

Produce : `<block type="un_type" example=1>`

##### Mutation argument

```js
{
    "example": un_objet_block_en_xml,
    "example2": null,
    "!example3": un_objet_block_en_xml,
    "@example4": 2,
    "example5": [1, "hello"],
}
```

Will produce :
```xml
<mutation example4=2>
    <arg name="example">un_objet_block_en_xml</arg>
    <arg name="example2"></arg>
    <arg name="">un_objet_block_en_xml2</arg>
    <example5 name=1></example5>
    <example5 name="hello"></example5>
</mutation>
```

##### Statements argument

```js
{
    "example": [un_objet_bloc_en_xml, un_autre_bloc_en_xml]
}
```

Will produce :
```xml
<statement name="example">un_block_en_xml</statement>
<statement name="example">un_autre_bloc_en_xml</statement>
```

## Assigning a Python Function to a Block

Set the field `your_python_function` to a function `function(args, node)` (please don't include it in `ast_function.js` but in the appropriate file).

- `args`: Corresponds to the node.args object.
- `node`: The parent node.

It returns an object with the following fields:
- `name`: block_type
- `fields`, `values`, `settings`, `mutations`, and `statements`: (see "Creating a Block" section)


## Useful for Testing Blocks
XML visualization:

- [Code Beautify XML Viewer](https://codebeautify.org/xmlviewer)

Testing generated blocks and generating XML using Blockly blocks:
- [Blockly Demo](https://blockly-demo.appspot.com/static/demos/code/index.html
)

### Implemented Functions

#### Type
- [ ] Cast
- [ ] Variable

#### AST
- [x] AnnAssign
- [x] Assert
- [x] Assihn 
- [ ] Attribute
- [x] AugAssign
- [x] BinOp
- [x] BoolOp
- [x] Break
- [x] Call
- [ ] ClassDef
- [ ] Comment (just ingored, need to change this)
- [ ] comprehension - For / If (https://www.w3schools.com/python/python_lists_comprehension.asp)
- [x] Compare
- [ ] Constants
- [x] Continue
- [ ] Del (https://www.w3schools.com/python/ref_keyword_del.asp)
- [ ] Dict
- [x] Expr
- [x] For
- [ ] Functions
- [x] FunctionDef
- [ ] Global
- [x] If
- [x] IfExpr
- [ ] Import (How to deal with ?)
- [ ] Lambda
- [x] List
    - [x] len
    - [x] first_index
    - [x] last_index
    - [ ] lists_sort 
    - [x] pop
    - [x] insert
    - [x] append
    - [ ] clear
    - [ ] copy
    - [ ] count
    - [ ] extans
    - [ ] index
    - [ ] remove
    - [ ] reverse
- [x] Name
- [ ] NameConstant
- [ ] NonLocal
- [x] Num
- [x] Raise
- [x] Raw
- [x] Return
- [ ] Set
- [ ] Starred
- [x] Str
    - [ ] capitalize
    - [ ] casefold
    - [ ] center
    - [ ] count
    - [ ] encode
    - [ ] endswith
    - [ ] expandtabs
    - [x] find (TODO: arguments not working)
    - [ ] format
    - [ ] format_map
    - [ ] index
    - [ ] isanum
    - [ ] isalpha
    - [ ] isascii
    - [ ] isdecimal
    - [ ] isdigit
    - [ ] isidentifier
    - [ ] islower
    - [ ] isnumeric
    - [ ] isprintable
    - [ ] isspace
    - [ ] istitle
    - [ ] isupper
    - [x] join
    - [ ] ljust
    - [x] lower
    - [x] lstrip
    - [ ] maketrans
    - [ ] partition
    - [ ] replace
    - [x] rfind (TODO: argument not working)
    - [ ] rindex
    - [ ] rjust
    - [ ] rpartition
    - [ ] rsplit
    - [x] rstrip
    - [ ] rplit
    - [x] split
    - [ ] splitlines
    - [ ] startswith
    - [x] strip
    - [ ] swapcase
    - [x] title
    - [ ] translate
    - [x] upper
    - [ ] zfill
- [x] Subscript
- [x] Try
- [ ] Tuple
- [x] UnaryOp
- [x] While
- [ ] With
- [ ] Yield
- [ ] YieldFrom
- [ ] Function

#### Lib 
- [ ] Math
- [ ] additional Python things
- [ ] Random

#### Block not in PyBlock :

#### NumPy
- array

## Créer un block :
- blockguess