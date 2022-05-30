export default {
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    {
      name: 'comment',
      title: 'Comment',
      type: 'string',
    },
    {
      name: 'username',
      title: 'User Name',
      type: 'string',
    },
    {
      name: 'profileImage',
      title: 'Profile Image',
      type: 'string',
    },
    {
      name: 'tweet',
      title: 'Tweet',
      type: 'reference',
      to:{type:'tweet'}
    },
  ]}
