import gravatar from '../../utils/gravatar';

test('Gravatar Function test', () => {
  const email = 'danielmedinagi@gmail.com';
  const gravatarUrl = 'https://gravatar.com/avatar/88c93224404b993483c4e49ceb0a6dda';

  expect(gravatarUrl).toEqual(gravatar(email));

})
