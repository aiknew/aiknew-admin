import { RequestMethod } from '../../prisma'
import { t } from '../../util'
import { ApiItem } from '../types'

const uploadFile: ApiItem[] = [
  // Admin Upload File
  {
    apiName: t('admin-api.uploadFile.title'),
    url: '[/admin/upload-file]',
    method: RequestMethod.GET,
    parentId: '0',
    children: [
      {
        apiName: t('admin-api.uploadFile.list'),
        url: '/admin/upload-file/filesAndGroups',
        method: RequestMethod.GET,
      },
      {
        apiName: t('admin-api.uploadFile.add'),
        url: '/admin/upload-file',
        method: RequestMethod.POST,
      },
      {
        apiName: t('admin-api.uploadFile.edit'),
        url: '/admin/upload-file/:id',
        method: RequestMethod.PATCH,
      },
      {
        apiName: t('admin-api.uploadFile.delete'),
        url: '/admin/upload-file/:id',
        method: RequestMethod.DELETE,
      },
    ],
  },
  // Admin Upload File Group
  {
    apiName: t('admin-api.uploadFileGroup.title'),
    url: '[/admin/upload-file-group]',
    method: RequestMethod.GET,
    parentId: '0',
    children: [
      {
        apiName: t('admin-api.uploadFileGroup.children'),
        url: '/admin/upload-file-group/:id',
        method: RequestMethod.GET,
      },
      {
        apiName: t('admin-api.uploadFileGroup.add'),
        url: '/admin/upload-file-group',
        method: RequestMethod.POST,
      },
      {
        apiName: t('admin-api.uploadFileGroup.edit'),
        url: '/admin/upload-file-group/:id',
        method: RequestMethod.PATCH,
      },
      {
        apiName: t('admin-api.uploadFileGroup.delete'),
        url: '/admin/upload-file-group/:id',
        method: RequestMethod.DELETE,
      },
    ],
  },
]
export default uploadFile
