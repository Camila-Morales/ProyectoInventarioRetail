import PageLogo from '../../assets/img/PageLogo.png'

export function Home() {
  return (
    <main className="mx-auto flex max-w-160 flex-col place-content-center place-items-center gap-4">
      <h2 className="text-center text-3xl font-bold text-orange-600">
        Retail Inventory Management System
      </h2>
      <img className="w-40" src={PageLogo} alt="Retail track logo" />
      <p>
        Welcome to RetailTrack, the intelligent solution for retail inventory management. Our system
        allows you to have total control over your stock in real time, optimizing each movement to
        reduce losses and improve operational efficiency.
      </p>
    </main>
  )
}
