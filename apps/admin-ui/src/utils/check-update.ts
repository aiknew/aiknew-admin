import { i18n } from '@aiknew/shared-ui-locales'
import { ElMessageBox, type MessageBoxData } from 'element-plus'

const { t } = i18n.global
let currentConfirm: Promise<MessageBoxData | null> | null = null

export function confirmSingleton(
  title: string, msg: string
): Promise<MessageBoxData | null> {
  if (currentConfirm) {
    return currentConfirm
  }

  currentConfirm = ElMessageBox.confirm(
    msg,
    title,
    {
      confirmButtonText: t('confirm'),
      cancelButtonText: t('cancel'),
    }
  )
    .then(res => res)
    .finally(() => {
      currentConfirm = null
    })

  return currentConfirm
}

const APP_VERSION = 'APP_VERSION'

const getLocalVersion = () => {
  return localStorage.getItem(APP_VERSION);
}

const setLocalVersion = (version: string) => {
  localStorage.setItem(APP_VERSION, version);
}

const showUpdateNotification = async (latestVersion: string) => {
  confirmSingleton(t('updateVersionTitle'), t('updateVersionMsg')).then(() => {
    setLocalVersion(latestVersion)
    window.location.reload()
  })
}

export const checkUpdate = async () => {
  try {
    const res = await fetch('/version.json?t=' + Date.now());
    const data = await res.json();
    const latestVersion = data.version;
    const currentVersion = getLocalVersion()

    if (!currentVersion) {
      setLocalVersion(latestVersion)
      return
    }

    if (String(currentVersion) !== String(latestVersion)) {
      showUpdateNotification(latestVersion)
    }
  } catch (error) {
    console.error('Failed to check update:', error);
  }
}


if (!import.meta.env.DEV) {
  checkUpdate();
  setInterval(checkUpdate, 5 * 60 * 1000);
}

