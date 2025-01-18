// import React from 'react';

// const ListLoader = () => {
//   return (
//     <div className="overflow-hidden bg-slate-100 w-full rounded flex flex-col p-5">
//       <div className='h-6 mb-3 w-2/6 bg-slate-300 rounded'></div>
//       <div className="space-y-2">
//         <div className="h-4 bg-slate-300 rounded w-3/4"></div>
//         <div className="h-4 bg-slate-300 rounded w-5/6"></div>
//         <div className="h-4 bg-slate-300 rounded w-2/3"></div>
//       </div>
//     </div>
//   );
// };

// export default ListLoader;

import React from 'react';

const ListLoader = () => {
  return (
    <div className="overflow-hidden bg-slate-100 w-full rounded flex flex-col p-5">
      <div className="h-6 mb-3 w-2/6 bg-slate-300 rounded relative overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-slate-400 to-transparent"
          style={{
            animation: 'loading 1.5s infinite',
          }}
        ></div>
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-slate-300 rounded w-3/4 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-slate-400 to-transparent"
            style={{
              animation: 'loading 1.5s infinite',
            }}
          ></div>
        </div>
        <div className="h-4 bg-slate-300 rounded w-5/6 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-slate-400 to-transparent"
            style={{
              animation: 'loading 1.5s infinite',
            }}
          ></div>
        </div>
        <div className="h-4 bg-slate-300 rounded w-2/3 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-slate-400 to-transparent"
            style={{
              animation: 'loading 1.5s infinite',
            }}
          ></div>
        </div>
      </div>
      <style jsx>{`
        @keyframes loading {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

export default ListLoader;
