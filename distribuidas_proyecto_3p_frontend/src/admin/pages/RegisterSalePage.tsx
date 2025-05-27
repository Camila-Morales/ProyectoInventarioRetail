import { RegisterSaleModal } from '../../shared/components/RegisterSaleModal'
import { useNavigate } from 'react-router'

export function RegisterSalePage() {
  const navigate = useNavigate()

  return (
    <div className="p-6">
      <RegisterSaleModal
        onClose={() => navigate('/dashboard')}
        onSave={() => {

        }}
      />
    </div>
  )
}
