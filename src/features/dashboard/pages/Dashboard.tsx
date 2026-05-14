import Badge from "@/components/atom/Badge";
import { useCoinQuery } from "../hooks/useCoinQuery"

const Dashboard = () => {
  const { data, isLoading, currency } = useCoinQuery();
  const topData = data?.slice(0, 3);

  return (
    <section className="space-y-10 overflow-hidden p-4">
      <div className="relative text-center">
        <div className="bg-radial-[at_top] from-primary/60 to-transparent absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[70vh] blur-[99px]" />
        <h1
          className="
            text-[17vw] font-semibold font-sora
            bg-linear-to-b from-foreground from-25% via-foreground/5 via-60% to-background
            bg-clip-text bg-transparent text-transparent
            absolute top-0 left-1/2 -translate-x-1/2 -translate-y-20
          "
        >
          Dashboard
        </h1>
        <div className="flex justify-evenly items-center gap-4 pt-35">
          {topData &&
            topData.map((coin, index) => (
              <div
                key={index}
                className="group relative w-[400px] h-[240px] rounded-2xl border border-strong/70 bg-subtle/40 backdrop-blur-md overflow-hidden transition-all duration-500 hover:border-primary/50"
              >
                <div className="absolute -inset-1 bg-linear-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -right-10 -bottom-10 w-60 opacity-10 grayscale group-hover:grayscale-0 group-hover:opacity-50 transition-all duration-700 rotate-12 group-hover:rotate-0">
                  <img src={coin?.image} alt="" className="w-full h-full object-contain" />
                </div>

                <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <h2 className="text-3xl font-sora font-bold tracking-tight text-white text-start flex items-end gap-3">
                      {coin?.name}
                      <span className="text-xs uppercase tracking-wide text-primary font-semibold mb-1 text-start">
                        #{index + 1}
                      </span>
                    </h2>
                    <img src={coin?.image} alt={coin?.name} className="w-12 h-12 rounded-full" />
                  </div>

                  <div className="flex flex-col">
                    <span className="text-4xl font-light tracking-tighter tabular-nums text-start">
                      {currency === 'usd' ? '$' : currency === 'eur' ? '€' : '₿'}
                      {coin?.current_price.toLocaleString()}
                    </span>
                    <div className={`text-sm mt-1 flex items-center gap-2 ${coin?.price_change_percentage_24h < 0 ? "text-warning" : "text-success"}`}>
                      <Badge variant={coin?.price_change_percentage_24h < 0 ? "danger" : "success"}>
                        {coin?.price_change_percentage_24h > 0 ? '+' : ''}
                        {coin?.price_change_percentage_24h?.toFixed(2)}%
                      </Badge>
                      <span className="opacity-40 text-[10px] uppercase tracking-widest">24H Change</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>

      <div className="w-full">
        <table className="w-full border-collapse">
          <thead className="border-b border-strong opacity-70">
            <tr className="text-xs uppercase tracking-wide">
              <th className="text-start font-bold py-4 px-4">Index</th>
              <th className="text-start font-bold py-4 px-4">Coin</th>
              <th className="text-right font-bold py-4 px-4">Valuation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-subtle/50">
            {data ? (
              data.map((coin, index) => {
                console.log('testdddd')
                return (
                  <tr key={index} className="group hover:bg-subtle/60 transition-all duration-300">
                    <td className="py-3 px-4 text-xs opacity-60 group-hover:opacity-100">
                      {String(index + 1).padStart(3, '0')}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <img
                            src={coin?.image}
                            alt={coin?.name}
                            className="w-8 h-8 rounded-full"
                          />
                        </div>
                        <div className="flex flex-col uppercase">
                          <span className="text-sm font-black">{coin?.symbol}</span>
                          <span className="text-[10px] opacity-60 tracking-wider">{coin?.name}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="text-lg tracking-tighter tabular-nums flex flex-col justify-end">
                        <span>
                          {currency === 'usd' ? '$ ' : currency === 'eur' ? '€ ' : '₿ '}
                          {coin?.current_price.toLocaleString('en-US')}
                        </span>
                        <span className={`text-sm  ${coin?.price_change_percentage_24h?.toString().charAt(0) === "-" ? "text-warning" : "text-success"}`}>
                          { }
                          {coin?.price_change_percentage_24h?.toFixed(2)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-12 text-xs uppercase tracking-[3px] opacity-60">
                  {isLoading ? 'Synchronizing Data...' : 'No Data Found'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section >
  )
}

export default Dashboard