"use strict";

/*;
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

const NUMBER_TYPE = (
		(
			global
			.NUMBER_TYPE
		)
	||
		(
			"number"
		)
);

const OBJECT_TYPE = (
		(
			global
			.OBJECT_TYPE
		)
	||
		(
			"object"
		)
);

const STRING_TYPE = (
		(
			global
			.STRING_TYPE
		)
	||
		(
			"string"
		)
);

const UNDEFINED_TYPE = (
		(
			global
			.UNDEFINED_TYPE
		)
	||
		(
			"undefined"
		)
);

const DOUBLE_COMMA_ARRAY_JOINER = (
	",,"
);

const SINGLE_COMMA_ARRAY_SEPARATOR = (
	","
);

const ARRAY_FIELD_PATTERN = (
	/(.+?)?\[(\d+?)\]/
);

const ARRAY_FIELD = (
	1
);

const FIELD_INDEX = (
	2
);

const LINKED_FIELD_PATTERN = (
	/\./g
);

const LINKED_ARRAY_FIELD_PATTERN = (
	/\]\[/g
);

const LINKED_ARRAY_FIELD_REPLACER = (
	"].["
);

const LINKED_NAMED_ARRAY_FIELD_PATTERN = (
	/([^\]])\[/g
);

const LINKED_NAMED_ARRAY_FIELD_REPLACER = (
	"$1.["
);

const NUMERIC_FORMAT_PATTERN = (
	/^\d+$/
);

const inflateData = (
	function inflateData( data ){
		/*;
			@definition:
				@procedure: #inflateData
					@description:
						Inflate flattened data.
					@description;
				@procedure;

				@parameter: #data
					@type:
							object
					@type;

					@description:
					@description;

					@required;
				@parameter;

				@result:#result
					@type:
							object
					@type;

					@description:
					@description;
				@result;

				@trigger: #trigger
					@type:
							object:as:Error
					@type;

					@description:
					@description;
				@trigger;
			@definition;
		*/

		if(
				(
						typeof
						data
					!=	OBJECT_TYPE
				)
			||
				(
						data
					===	null
				)
			||
				(
						Object
						.keys(
							(
								data
							)
						)
						.length
					<=	0
				)
		){
			return	(
						undefined
					);
		}

		const resultData = (
			{ }
		);

		const fieldList = (
			(
				[
					undefined
				]
			)
			.concat(
				(
					Object.keys( data )
					.join( DOUBLE_COMMA_ARRAY_JOINER )
					.split( SINGLE_COMMA_ARRAY_SEPARATOR )
					.map(
						function( field ){
							return	(
											(
												field
											)
										||
											(
												undefined
											)
									);
						}
					)
				)
			)
		);

		const valueStack = (
			[ ]
		);

		let parentReference = (
			resultData
		);

		for(
			let index = fieldList.length;
			index > 0;
			index--
		){
			const field = (
				fieldList.pop( )
			);

			if(
					(
							typeof
							field
						==	UNDEFINED_TYPE
					)
			){
				(
						parentReference
					=	(
							resultData
						)
				);

				continue;
			}

			const value = (
				data[ field ]
			);

			const fieldTokenList = (
				field
				.replace(
					(
						LINKED_NAMED_ARRAY_FIELD_PATTERN
					),

					(
						LINKED_NAMED_ARRAY_FIELD_REPLACER
					)
				)
				.replace(
					(
						LINKED_ARRAY_FIELD_PATTERN
					),

					(
						LINKED_ARRAY_FIELD_REPLACER
					)
				)
				.split(
					(
						LINKED_FIELD_PATTERN
					)
				)
			);

			if(
					(
							fieldTokenList
							.length
						>	1
					)
			){
				Array.prototype.splice
				.apply(
					(
						fieldList
					),

					(
						[
							(
								fieldList
								.length
							),

							(
								0
							)
						]
						.concat(
							(
								fieldTokenList
								.reverse( )
							)
						)
					)
				);

				valueStack.push( value );

				(
						index
					=	(
							fieldList
							.length
						)
				);

				continue;
			}

			const nextField = (
				Array.from(
					(
						fieldList
					)
				)
				.pop( )
			);

			const fieldIndex = (
				parseInt(
					(
							(
									(
										field
										.match( ARRAY_FIELD_PATTERN )
									)
								||
									(
										[ ]
									)
							)[ FIELD_INDEX ]
						||
							(
								-1
							)
					)
				)
			);

			if(
					(
							ARRAY_FIELD_PATTERN
							.test(
								(
									field
								)
							)
						===	true
					)
				&&
					(
							ARRAY_FIELD_PATTERN
							.test(
								(
									nextField
								)
							)
						===	true
					)
			){
				(
						parentReference[ fieldIndex ]
					=	(
								(
									parentReference[ fieldIndex ]
								)
							||
								(
									[ ]
								)
						)
				);

				(
						parentReference
					=	(
							parentReference[ fieldIndex ]
						)
				);

				continue;
			}

			if(
					(
							ARRAY_FIELD_PATTERN
							.test(
								(
									field
								)
							)
						===	true
					)
				&&
					(
							ARRAY_FIELD_PATTERN
							.test(
								(
									nextField
								)
							)
						!==	true
					)
				&&
					(
							typeof
							nextField
						!=	UNDEFINED_TYPE
					)
			){
				(
						parentReference[ fieldIndex ]
					=	(
								(
									parentReference[ fieldIndex ]
								)
							||
								(
									{ }
								)
						)
				);

				(
						parentReference
					=	(
							parentReference[ fieldIndex ]
						)
				);

				continue;
			}

			if(
					(
							ARRAY_FIELD_PATTERN
							.test(
								(
									field
								)
							)
						===	true
					)
				&&
					(
							typeof
							nextField
						==	UNDEFINED_TYPE
					)
			){
				(
						parentReference[ fieldIndex ]
					=	(
								(
									valueStack.pop( )
								)
							||
								(
									value
								)
						)
				);

				continue;
			}

			if(
					(
							ARRAY_FIELD_PATTERN
							.test(
								(
									field
								)
							)
						!==	true
					)
				&&
					(
							ARRAY_FIELD_PATTERN
							.test(
								(
									nextField
								)
							)
						===	true
					)
			){
				(
						parentReference[ field ]
					=	(
								(
									parentReference[ field ]
								)
							||
								(
									[ ]
								)
						)
				);

				(
						parentReference
					=	(
							parentReference[ field ]
						)
				);

				continue;
			}

			if(
					(
							ARRAY_FIELD_PATTERN
							.test(
								(
									field
								)
							)
						!==	true
					)
				&&
					(
							ARRAY_FIELD_PATTERN
							.test(
								(
									nextField
								)
							)
						!==	true
					)
				&&
					(
							typeof
							nextField
						!=	UNDEFINED_TYPE
					)
			){
				(
						parentReference[ field ]
					=	(
								(
									parentReference[ field ]
								)
							||
								(
									{ }
								)
						)
				);

				(
						parentReference
					=	(
							parentReference[ field ]
						)
				);

				continue;
			}

			if(
					(
							ARRAY_FIELD_PATTERN
							.test(
								(
									field
								)
							)
						!==	true
					)
				&&
					(
							typeof
							nextField
						==	UNDEFINED_TYPE
					)
			){
				(
						parentReference[ field ]
					=	(
								(
									valueStack.pop( )
								)
							||
								(
									value
								)
						)
				);

				continue;
			}
		}

		if(
				(
						Object.keys( resultData )
						.every(
							(
								( field ) => (
										(
												typeof
												field
											==	NUMBER_TYPE
										)
									||
										(
												( NUMERIC_FORMAT_PATTERN )
												.test(
													(
														field
													)
												)
											===	true
										)
								)
							)
						)
					===	true
				)
		){
			(
					resultData
					.length
				=	(
						Object.keys( resultData )
						.length
					)
			);

			return	(
						Array.from( resultData )
					);
		}

		return	(
					resultData
				);
	}
);

(
		module
		.exports
	=	(
			inflateData
		)
);
