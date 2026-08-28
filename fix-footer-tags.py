import re

with open("app/components/Footer.tsx", "r") as f:
    content = f.read()

# The incorrect part is:
#           </div>
#             <a 
#               href="https://buymeacoffee.com/medhastone" 
#               target="_blank" 
#               rel="noopener noreferrer"
#               className="text-amber-400 hover:text-amber-300 transition-colors text-sm font-semibold flex items-center gap-1"
#             >
#               Or open direct link <span aria-hidden="true">&rarr;</span>
#             </a>
#           </div>
#         </div>
#       </div>
#       <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">

# Let's replace the whole block starting from `<div className="w-full xl:w-72 shrink-0 flex flex-col items-center xl:items-start">` down to `</div>      </div>` with a clean one.

start_marker = '<div className="w-full xl:w-72 shrink-0 flex flex-col items-center xl:items-start">'
end_marker = '<div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">'

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

new_block = """<div className="w-full xl:w-72 shrink-0 flex flex-col items-center xl:items-start">
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 flex flex-col items-center text-center w-full max-w-[260px]">
            <h3 className="font-bold text-white mb-1.5 text-sm">Support This Free Tool</h3>
            <p className="text-slate-400 text-xs mb-3 leading-snug">
              Scan with any payment app or camera to buy a coffee ☕
            </p>
            <div className="bg-white p-2 rounded-xl mb-3 w-full flex justify-center max-w-[120px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/qr-code.png`} alt="Buy Me a Coffee QR Code" className="w-full h-auto aspect-square object-contain" />
            </div>
            <a 
              href="https://buymeacoffee.com/medhastone" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 transition-colors text-xs font-semibold flex items-center gap-1"
            >
              Or open direct link <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
      
            """

content = content[:start_idx] + new_block + content[end_idx:]

with open("app/components/Footer.tsx", "w") as f:
    f.write(content)

