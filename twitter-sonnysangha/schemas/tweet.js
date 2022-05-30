export default {
  name: 'tweet',
  title: 'Tweet',
  type: 'document',
  fields: [
    {
      name: 'text',
      title: 'text in tweet',
      type: 'string',
    },
    
    {
      name: 'blockTweet',
      title: 'Block Tweet',
      desciption:'ADMIN controls: toggle if tweet is deemed iappropriate',
      type:'boolean'
    },
    {
      name: 'username',
      title: 'Username',
      type: 'string',
      
    },
    {
      name: 'profileImage',
      title: 'Profile Image',
      type: 'string',
      
    },
    {
      name: 'image',
      title: 'Tweet image',
      type: 'string',
      
    },
  ]
}
 
