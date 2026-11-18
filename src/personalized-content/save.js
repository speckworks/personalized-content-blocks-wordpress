import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { audience } = attributes;

	const blockProps = useBlockProps.save( {
		className: `pc-audience-${ audience }`,
		'data-audience': audience,
	} );

	return (
		<div { ...blockProps }>
			<InnerBlocks.Content />
		</div>
	);
}
