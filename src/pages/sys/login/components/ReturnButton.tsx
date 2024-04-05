import { Button } from 'antd'
import { useTranslation } from 'react-i18next'

interface ReturnButtonProps {
  onClick?: () => void
}
export function ReturnButton({ onClick }: ReturnButtonProps) {
  const { t } = useTranslation()
  return (
    <Button block type="link" onClick={onClick}>
      <div className="flex items-center justify-center hover:underline">
        <i className="i-ic:round-arrow-back-ios-new h-13px w-13px" />
        <span className="text-sm">{t('sys.login.backSignIn')}</span>
      </div>
    </Button>
  )
}
