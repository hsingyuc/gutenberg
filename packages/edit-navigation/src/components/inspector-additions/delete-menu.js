/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function DeleteMenu( { onDeleteMenu } ) {
	return (
		<Button
			className="edit-navigation-inspector-additions__delete-menu-button"
			isTertiary
			isDestructive
			onClick={ () => {
				if (
					// eslint-disable-next-line no-alert
					window.confirm(
						__( 'Are you sure you want to delete this navigation?' )
					)
				) {
					onDeleteMenu();
				}
			} }
		>
			{ __( 'Delete menu' ) }
		</Button>
	);
}