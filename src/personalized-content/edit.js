import { __, sprintf } from '@wordpress/i18n';
import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';

const AUDIENCES = [
	{ label: __( 'Everyone', 'personalized-content' ), value: 'all' },
	{ label: __( 'New visitors', 'personalized-content' ), value: 'new' },
	{
		label: __( 'Returning visitors', 'personalized-content' ),
		value: 'returning',
	},
];

const TEMPLATE = [
	[
		'core/heading',
		{
			level: 2,
			placeholder: __( 'Headline for this audience', 'personalized-content' ),
		},
	],
	[
		'core/paragraph',
		{ placeholder: __( 'Supporting copy…', 'personalized-content' ) },
	],
];

export default function Edit( { attributes, setAttributes } ) {
	const { audience } = attributes;

	// The editor always shows every variant so authors can edit them all.
	// Visibility rules only apply on the front end (see style.css).
	const blockProps = useBlockProps( { 'data-audience': audience } );
	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'pc-inner' },
		{ template: TEMPLATE }
	);

	const current = AUDIENCES.find( ( a ) => a.value === audience );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Audience', 'personalized-content' ) }>
					<SelectControl
						__nextHasNoMarginBottom
						label={ __( 'Show this content to', 'personalized-content' ) }
						value={ audience }
						options={ AUDIENCES }
						onChange={ ( value ) => setAttributes( { audience: value } ) }
						help={ __(
							'Add one block per audience. Every variant ships in the page HTML, so it stays cache-friendly.',
							'personalized-content'
						) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="pc-badge">
					{ sprintf(
						/* translators: %s: audience label */
						__( 'Shown to: %s', 'personalized-content' ),
						current?.label
					) }
				</div>
				<div { ...innerBlocksProps } />
			</div>
		</>
	);
}
