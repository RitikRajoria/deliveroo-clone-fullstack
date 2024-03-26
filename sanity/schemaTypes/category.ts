import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'category',
  title: 'Menu Category',
  type: 'document',
  fields: [ 
    defineField({
      name: 'name',
      title: 'Category Name',
      type: 'string',
      validation: (Rule)=> Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image of category',
      type: 'image',
    }),
  ],
  orderings:[
    {
      title:"Last Edited",
      name:"lastedited",
      by:[{
        field:"name",direction:"asc",
      }],
    }
  ],
})
