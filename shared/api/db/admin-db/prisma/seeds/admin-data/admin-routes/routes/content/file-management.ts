import { i18n } from '../../i18n'
import { defineRouteItem, RouteType } from '../../types'

export const fileManagement = defineRouteItem({
  name: i18n.fileManagement,
  type: RouteType.SMALL_GROUP,
  order: 100,
  children: [
    {
      component: 'content/file/file-resources',
      icon: 'Picture',
      path: '/content/file',
      type: RouteType.MENU,
      name: i18n.fileManagement,
      permissions: ['upload-file:filesAndGroups', 'upload-file-group:findChildren', 'file-storage:getAll'],
      order: 101,
      children: [
        {
          key: 'upload-file',
          type: RouteType.BUTTON,
          name: i18n.uploadFiles,
          permissions: ['upload-file:create'],
        },
        {
          key: 'edit-file',
          type: RouteType.BUTTON,
          name: i18n.editFile,
          permissions: ['upload-file:update'],
        },
        {
          key: 'delete-file',
          type: RouteType.BUTTON,
          name: i18n.deleteFiles,
          permissions: ['upload-file:delete'],
        },
        {
          key: 'add-group',
          type: RouteType.BUTTON,
          name: i18n.addFileGroup,
          permissions: ['upload-file-group:create'],
        },
        {
          key: 'edit-group',
          type: RouteType.BUTTON,
          name: i18n.editFileGroup,
          permissions: ['upload-file-group:update'],
        },
        {
          key: 'delete-group',
          type: RouteType.BUTTON,
          name: i18n.deleteFileGroup,
          permissions: ['upload-file-group:delete'],
        },
      ],
    }
  ]
}
)