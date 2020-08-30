export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-nextjs-landing-pages'
      }
    },
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '5f4ba927a0882911db7b0675',
                  title: 'Sanity Studio',
                  name: 'kompetanseprogram-sanity-cms-studio',
                  apiId: '153636dc-ca97-4df5-86a5-79ebd9bd53d5'
                },
                {
                  buildHookId: '5f4ba927cff5d0ec447c60fb',
                  title: 'Landing pages Website',
                  name: 'kompetanseprogram-sanity-cms',
                  apiId: '5284803e-1fb1-4ed9-80bf-36900ff321e9'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/HeleneGrini/kompetanseprogram-sanity-cms',
            category: 'Code'
          },
          {title: 'Frontend', value: 'https://kompetanseprogram-sanity-cms.netlify.app', category: 'apps'}
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recently edited', order: '_updatedAt desc', limit: 10, types: ['page']},
      layout: {width: 'medium'}
    }
  ]
}
