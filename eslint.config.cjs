/**
 * ESLint: the WordPress recommended rules from @wordpress/scripts.
 *
 * The @wordpress/* packages are not installed from npm. WordPress loads
 * them on the page, and the build declares them as script dependencies
 * (see index.asset.php), so the import rules must not look for them.
 */
const wordpressConfig = require( '@wordpress/scripts/config/eslint.config.cjs' );

module.exports = [
	...wordpressConfig,
	{
		rules: {
			'import/no-unresolved': [ 'error', { ignore: [ '^@wordpress/' ] } ],
			'import/no-extraneous-dependencies': 'off',
		},
	},
];
