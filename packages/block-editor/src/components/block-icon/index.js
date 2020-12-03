/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { __experimentalGetBlockTypeWithVariationInfo as getBlockTypeWithVariationInfo } from '@wordpress/blocks';
import { Icon } from '@wordpress/components';
import { blockDefault } from '@wordpress/icons';

export default function BlockIcon( {
	clientId,
	icon,
	showColors = false,
	className,
} ) {
	if ( icon?.src === 'block-default' ) {
		icon = {
			src: blockDefault,
		};
	}

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

	// give priority to icon??
	if ( name && ! icon ) {
		const blockType = getBlockTypeWithVariationInfo( name, attributes );
		if ( blockType?.icon ) {
			icon = blockType.icon;
		}
	}

	const renderedIcon = <Icon icon={ icon?.src || icon } />;
	const style = showColors
		? {
				backgroundColor: icon?.background,
				color: icon?.foreground,
		  }
		: {};

	return (
		<span
			style={ style }
			className={ classnames( 'block-editor-block-icon', className, {
				'has-colors': showColors,
			} ) }
		>
			{ renderedIcon }
		</span>
	);
}
