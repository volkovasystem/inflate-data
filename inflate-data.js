!function webpackUniversalModuleDefinition(root,factory){"object"==typeof exports&&"object"==typeof module?module.exports=factory():"function"==typeof define&&define.amd?define("inflateData",[],factory):"object"==typeof exports?exports.inflateData=factory():root.inflateData=factory()}(this,(()=>(()=>{"use strict";var __webpack_modules__={147:(module,__unused_webpack_exports,__webpack_require__)=>{
/*;!
	@license:module:
		MIT License

		Copyright (c) 2023-present Richeve S. Bebedor <richeve.bebedor@gmail.com>

		@license:copyright:
			Richeve S. Bebedor

			<@license:year-range:2023-present;>

			<@license:contact-detail:richeve.bebedor@gmail.com;>
		@license:copyright;

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.
	@license:module;
*/
const NUMBER_TYPE=__webpack_require__.g.NUMBER_TYPE||"number",OBJECT_TYPE=__webpack_require__.g.OBJECT_TYPE||"object",UNDEFINED_TYPE=(__webpack_require__.g.STRING_TYPE,__webpack_require__.g.UNDEFINED_TYPE||"undefined"),ARRAY_FIELD_PATTERN=/(.+?)?\[(\d+?)\]/,LINKED_FIELD_PATTERN=/\./g,LINKED_ARRAY_FIELD_PATTERN=/\]\[/g,LINKED_NAMED_ARRAY_FIELD_PATTERN=/([^\]])\[/g,NUMERIC_FORMAT_PATTERN=/^\d+$/;module.exports=function inflateData(data){if(typeof data!=OBJECT_TYPE||null===data||Object.keys(data).length<=0)return data;const resultData={},fieldList=[void 0].concat(Object.keys(data).join(",,").split(",").map((function(field){return field||void 0}))),valueStack=[];let parentReference=resultData;for(let index=fieldList.length;index>0;index--){const field=fieldList.pop();if(typeof field==UNDEFINED_TYPE){parentReference=resultData;continue}const value=data[field],fieldTokenList=field.replace(LINKED_NAMED_ARRAY_FIELD_PATTERN,"$1.[").replace(LINKED_ARRAY_FIELD_PATTERN,"].[").split(LINKED_FIELD_PATTERN);if(fieldTokenList.length>1){Array.prototype.splice.apply(fieldList,[fieldList.length,0].concat(fieldTokenList.reverse())),valueStack.push(value),index=fieldList.length;continue}const nextField=Array.from(fieldList).pop(),fieldIndex=parseInt((field.match(ARRAY_FIELD_PATTERN)||[])[2]||-1);!0!==ARRAY_FIELD_PATTERN.test(field)||!0!==ARRAY_FIELD_PATTERN.test(nextField)?!0!==ARRAY_FIELD_PATTERN.test(field)||!0===ARRAY_FIELD_PATTERN.test(nextField)||typeof nextField==UNDEFINED_TYPE?!0!==ARRAY_FIELD_PATTERN.test(field)||typeof nextField!=UNDEFINED_TYPE?!0===ARRAY_FIELD_PATTERN.test(field)||!0!==ARRAY_FIELD_PATTERN.test(nextField)?!0===ARRAY_FIELD_PATTERN.test(field)||!0===ARRAY_FIELD_PATTERN.test(nextField)||typeof nextField==UNDEFINED_TYPE?!0===ARRAY_FIELD_PATTERN.test(field)||typeof nextField!=UNDEFINED_TYPE||(parentReference[field]=valueStack.pop()||value):(parentReference[field]=parentReference[field]||{},parentReference=parentReference[field]):(parentReference[field]=parentReference[field]||[],parentReference=parentReference[field]):parentReference[fieldIndex]=valueStack.pop()||value:(parentReference[fieldIndex]=parentReference[fieldIndex]||{},parentReference=parentReference[fieldIndex]):(parentReference[fieldIndex]=parentReference[fieldIndex]||[],parentReference=parentReference[fieldIndex])}return!0===Object.keys(resultData).every((field=>typeof field==NUMBER_TYPE||!0===NUMERIC_FORMAT_PATTERN.test(field)))?(resultData.length=Object.keys(resultData).length,Array.from(resultData)):resultData}}},__webpack_module_cache__={};function __webpack_require__(moduleId){var cachedModule=__webpack_module_cache__[moduleId];if(void 0!==cachedModule)return cachedModule.exports;var module=__webpack_module_cache__[moduleId]={exports:{}};return __webpack_modules__[moduleId](module,module.exports,__webpack_require__),module.exports}return __webpack_require__.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),__webpack_require__(147)})()));