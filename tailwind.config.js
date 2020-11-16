module.exports = {
  theme: {
    extend: {
      colors: {
        swatch: {
          1: '#eef4f4',
          2: '#6cb2b2',
          3: '#a6bdbb ',
          4: '#052425 ',
          5: '#3f595b ',
          6: '#fb9119 ',
          7: '#c05e3d ',
          8: '#6398de '
        }
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
        '128': '32rem',
      },
      maxWidth: {
        '7xl': '86rem',
        '8xl': '98rem',
      },
      maxHeight: {
        '90': '90%'
      },
      minWidth: {
        '20': '5rem'

      },
      borderRadius: {
        'xl': '1rem'
      },
      translate: {
        '-22': '-5.5rem',
        '-26': '-6.5rem',
        '-28': '-7rem',
        '1/5': '20%'
      },
      padding: {
        '14': "3.5rem"
      }
    }
  },
  variants: {
    backgroundColor: [ 'responsive', 'hover', 'focus', 'active',],
    textColor: [ 'responsive', 'hover', 'focus', 'active',]
  },
  plugins: [],
}
