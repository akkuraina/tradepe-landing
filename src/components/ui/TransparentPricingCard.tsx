"use client";

interface TransparentPricingCardProps {
  amount?: number;
  rate?: number;
  currencyFrom?: string;
  currencyTo?: string;
  fromSymbol?: string;
  toSymbol?: string;
  className?: string;
}

export function TransparentPricingCard({
  amount = 10000,
  rate = 95.94,
  currencyFrom = "USD",
  currencyTo = "INR",
  fromSymbol = "$",
  toSymbol = "₹",
  className = "",
}: TransparentPricingCardProps) {
  // Calculations matching TradePe transparent pricing formula:
  // Gross = amount * rate
  // Transaction fee = Gross * 0.0027 (0.27%)
  // GST = Transaction fee * 0.18 (18%)
  // Net Received = Gross - Transaction fee - GST
  const gross = amount * rate;
  const transactionFee = gross * 0.0027;
  const gstFee = transactionFee * 0.18;
  const netReceived = gross - transactionFee - gstFee;

  // Format Indian number system (e.g. 8,34,057.2)
  const formatIndianCurrency = (num: number) => {
    const parts = num.toFixed(1).split(".");
    const integerPart = parts[0];
    const decimalPart = parts[1];

    let lastThree = integerPart.substring(integerPart.length - 3);
    const otherNumbers = integerPart.substring(0, integerPart.length - 3);
    if (otherNumbers !== "") {
      lastThree = "," + lastThree;
    }
    const formattedInt =
      otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;

    return `${toSymbol}${formattedInt}.${decimalPart}`;
  };

  return (
    <div
      className={`w-full max-w-md mx-auto rounded-3xl bg-white border border-black/10 p-5 sm:p-7 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.06)] select-none ${className}`}
    >
      {/* 1. Client Pays Row */}
      <div className="flex items-center justify-between gap-4 pb-4">
        <div className="space-y-1">
          <span className="font-sans text-xs sm:text-sm font-medium text-[#0A0A0A]/60 block">
            Client pays
          </span>
          <span className="font-sans text-lg sm:text-xl font-bold text-[#0A0A0A] block">
            {currencyFrom}
          </span>
        </div>

        {/* Input Amount Box */}
        <div className="rounded-2xl border border-black/15 bg-white px-5 py-3 sm:px-6 sm:py-3.5 shadow-sm min-w-[150px] text-right">
          <span className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#0A0A0A]">
            {fromSymbol}{amount.toLocaleString()}
          </span>
        </div>
      </div>

      {/* 2. Middle Breakdown */}
      <div className="py-4 space-y-3.5 border-y border-black/5 my-1">
        {/* Row 1: Live FX, Zero margin */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#107c24] text-white text-[11px] sm:text-xs font-semibold tracking-wide shadow-sm">
            Live FX, Zero margin
          </div>

          <div className="flex items-center gap-2">
            <span className="h-5 w-5 rounded-full bg-[#ffefe9] text-[#e04f24] flex items-center justify-center text-[10px] font-bold">
              ✕
            </span>
            <span className="font-sans text-sm sm:text-base font-bold text-[#0A0A0A] font-mono">
              {rate.toFixed(4)}
            </span>
          </div>
        </div>

        {/* Row 2: Transaction fee */}
        <div className="flex items-center justify-between text-xs sm:text-sm text-[#0A0A0A]/70 font-medium">
          <span>Transaction fee</span>
          <div className="flex items-center gap-2">
            <span className="h-5 w-5 rounded-full bg-black/5 text-[#0A0A0A]/60 flex items-center justify-center text-[10px] font-bold">
              −
            </span>
            <span className="font-sans text-sm sm:text-base font-semibold text-[#0A0A0A] font-mono">
              {transactionFee.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Row 3: GST (18% transaction fee) */}
        <div className="flex items-center justify-between text-xs sm:text-sm text-[#0A0A0A]/70 font-medium">
          <span>GST (18% transaction fee)</span>
          <div className="flex items-center gap-2">
            <span className="h-5 w-5 rounded-full bg-black/5 text-[#0A0A0A]/60 flex items-center justify-center text-[10px] font-bold">
              −
            </span>
            <span className="font-sans text-sm sm:text-base font-semibold text-[#0A0A0A] font-mono">
              {gstFee.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* 3. You'll Receive Row */}
      <div className="flex items-center justify-between gap-4 pt-4">
        <div className="space-y-1">
          <span className="font-sans text-xs sm:text-sm font-medium text-[#0A0A0A]/60 block">
            You&apos;ll receive
          </span>
          <span className="font-sans text-lg sm:text-xl font-bold text-[#0A0A0A] block">
            {currencyTo}
          </span>
        </div>

        {/* Output Box */}
        <div className="rounded-2xl border border-black/15 bg-white px-5 py-3 sm:px-6 sm:py-3.5 shadow-sm min-w-[160px] text-right">
          <span className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#0A0A0A]">
            {formatIndianCurrency(netReceived)}
          </span>
        </div>
      </div>
    </div>
  );
}
