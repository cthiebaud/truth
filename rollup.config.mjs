// rollup.config.js
import terser from '@rollup/plugin-terser';

export default {
	input: 'src/js/index.js',
	output: [
		{
			file: 'dist/js/bundle.min.js',
			format: 'es',
			plugins: [terser()]
		}
	],
};