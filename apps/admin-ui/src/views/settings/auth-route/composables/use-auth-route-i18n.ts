import { useI18n, type Composer } from 'vue-i18n'

const messages = {
  en: {
    routeTypeGroup: 'Group',
    routeTypeSmallGroup: 'Subgroup',
    routeTypeMenu: 'Menu',
    routeTypeButton: 'Button',
    routeType: 'Type',
    iconLabel: 'Icon',
    redirectLabel: 'Redirect',
    hiddenLabel: 'Hidden',
    hiddenTips: 'Whether to hide in the left menu bar',
    componentLabel: 'Component Location',
    componentTips: 'Location of the component file',
    statusLabel: 'Status',
    statusTips: 'Whether to enable',
    pathLabel: 'Route Path',
    keyLabel: 'Permission Key',
    keyTips: 'Permission identifier for the button',
    apiLabel: 'API Permission',
    routeNameLabel: 'Route Name',
    addTitle: 'Add Menu',
    editTitle: 'Edit Menu'
  },
  'zh-CN': {
    routeTypeGroup: '分组',
    routeTypeSmallGroup: '小分组',
    routeTypeMenu: '菜单',
    routeTypeButton: '按钮',
    routeType: '类型',
    iconLabel: '图标',
    redirectLabel: '重定向',
    hiddenLabel: '隐藏',
    hiddenTips: '是否在左侧菜单栏中隐藏',
    componentLabel: '组件位置',
    componentTips: '组件文件所在位置',
    statusLabel: '状态',
    statusTips: '是否启用',
    pathLabel: '路由路径',
    keyLabel: '权限标识',
    keyTips: '按钮的权限标识',
    apiLabel: 'API权限',
    routeNameLabel: '路由名称',
    addTitle: '新增菜单',
    editTitle: '编辑菜单'
  },
  'zh-TW': {
    routeTypeGroup: '分組',
    routeTypeSmallGroup: '小分組',
    routeTypeMenu: '菜單',
    routeTypeButton: '按鈕',
    routeType: '類型',
    iconLabel: '圖示',
    redirectLabel: '重定向',
    hiddenLabel: '隱藏',
    hiddenTips: '是否在左側菜單欄中隱藏',
    componentLabel: '組件位置',
    componentTips: '組件文件所在位置',
    statusLabel: '狀態',
    statusTips: '是否啟用',
    pathLabel: '路由路徑',
    keyLabel: '權限標識',
    keyTips: '按鈕的權限標識',
    apiLabel: 'API權限',
    routeNameLabel: '路由名稱',
    addTitle: '新增選單',
    editTitle: '編輯選單'
  }
}

let instance: Composer<typeof messages>

export const useAuthRouteI18n = () => {
  if (!instance) {
    instance = useI18n({ messages })
  }

  return instance
}
