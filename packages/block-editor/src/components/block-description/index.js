/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { __experimentalGetBlockTypeWithVariationInfo as getBlockTypeWithVariationInfo } from '@wordpress/blocks';

/**
 * Renders the block's configured description as a string, or empty if the description
 * cannot be determined.
 *
 * @example
 *
 * ```jsx
 * <BlockDescription clientId="afd1cb17-2c08-4e7a-91be-007ba7ddc3a1" />
 * ```
 * @param {Object} props
 * @param {string} props.clientId Client ID of block.
 * @param {string} props.description Description
 * @return {?string} Block Description.
 */
export default function BlockDescription( { clientId, description } ) {
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
	if ( description ) return description; // Prioritize explicitly given description
	if ( ! name ) {
		return null;
	}

	const blockType = getBlockTypeWithVariationInfo( name, attributes );
	return blockType?.description ?? null;
}
