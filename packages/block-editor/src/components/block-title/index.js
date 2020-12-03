/**
 * External dependencies
 */
import { truncate } from 'lodash';

/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import {
	__experimentalGetBlockTypeWithVariationInfo as getBlockTypeWithVariationInfo,
	__experimentalGetBlockLabel as getBlockLabel,
} from '@wordpress/blocks';

/**
 * Renders the block's configured title as a string, or empty if the title
 * cannot be determined.
 *
 * @example
 *
 * ```jsx
 * <BlockTitle clientId="afd1cb17-2c08-4e7a-91be-007ba7ddc3a1" />
 * ```
 *
 * @param {Object} props
 * @param {string} props.clientId Client ID of block.
 *
 * @return {?string} Block title.
 */
export default function BlockTitle( { clientId } ) {
	const { attributes, name } = useSelect(
		( select ) => {
			const { __unstableGetBlockWithoutInnerBlocks } = select(
				'core/block-editor'
			);
			const { name: _name, attributes: _attributes } =
				__unstableGetBlockWithoutInnerBlocks( clientId ) || {};
			return {
				attributes: _attributes,
				name: _name,
			};
		},
		[ clientId ]
	);

	if ( ! name ) {
		return null;
	}

	const blockType = getBlockTypeWithVariationInfo( name, attributes );
	if ( ! blockType ) {
		return null;
	}

	const { title } = blockType;
	const label = getBlockLabel( blockType, attributes );

	// Label will often fall back to the title if no label is defined for the
	// current label context. We do not want "Paragraph: Paragraph".
	if ( label !== title ) {
		return `${ title }: ${ truncate( label, { length: 15 } ) }`;
	}
	return title;
}
