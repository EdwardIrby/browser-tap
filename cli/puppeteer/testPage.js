/* eslint-disable no-template-curly-in-string */

const message = [
  '`Message : ${e.message}',
  'Filename: ${e.filename}',
  'Line: ${e.lineno}',
  'Column: ${e.colno}`',
].join('\n')

export const testPage = tests => () => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title></title>
  <script>
    window.onerror =  e => {
      console.error(${message})
    };
    window.onunhandledrejection = event => {
      console.error(event.reason);
    };
  </script>
</head>
<body>
  <script type="module">${tests}</script>
</body>
</html>
`
