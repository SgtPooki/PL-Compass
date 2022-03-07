// const RepositoriesTable = () => (
//   <div className="pa4">
//     <div className="overflow-auto">
//       <table className="f6 w-100 mw8 center" cellSpacing="0">
//         <thead>
//           <tr>
//             <th className="fw6 bb b--black-20 tl pb3 pr3 bg-white">Name</th>
//             <th className="fw6 bb b--black-20 tl pb3 pr3 bg-white">Username</th>
//             <th className="fw6 bb b--black-20 tl pb3 pr3 bg-white">Email</th>
//             <th className="fw6 bb b--black-20 tl pb3 pr3 bg-white">ID</th>
//           </tr>
//         </thead>
//         <tbody className="lh-copy">
//           <tr>
//             <td className="pv3 pr3 bb b--black-20">Hassan Johnson</td>
//             <td className="pv3 pr3 bb b--black-20">@hassan</td>
//             <td className="pv3 pr3 bb b--black-20">
//               hassan@companywithalongdomain.co
//             </td>
//             <td className="pv3 pr3 bb b--black-20">14419232532474</td>
//           </tr>
//           <tr>
//             <td className="pv3 pr3 bb b--black-20">Taral Hicks</td>
//             <td className="pv3 pr3 bb b--black-20">@hicks</td>
//             <td className="pv3 pr3 bb b--black-20">
//               taral@companywithalongdomain.co
//             </td>
//             <td className="pv3 pr3 bb b--black-20">72326219423551</td>
//           </tr>
//           <tr>
//             <td className="pv3 pr3 bb b--black-20">Tyrin Turner</td>
//             <td className="pv3 pr3 bb b--black-20">@tt</td>
//             <td className="pv3 pr3 bb b--black-20">
//               ty@companywithalongdomain.co
//             </td>
//             <td className="pv3 pr3 bb b--black-20">92325170324444</td>
//           </tr>
//           <tr>
//             <td className="pv3 pr3 bb b--black-20">Oliver Grant</td>
//             <td className="pv3 pr3 bb b--black-20">@oli</td>
//             <td className="pv3 pr3 bb b--black-20">
//               oliverg@companywithalongdomain.co
//             </td>
//             <td className="pv3 pr3 bb b--black-20">71165170352909</td>
//           </tr>
//           <tr>
//             <td className="pv3 pr3 bb b--black-20">Dean Blanc</td>
//             <td className="pv3 pr3 bb b--black-20">@deanblanc</td>
//             <td className="pv3 pr3 bb b--black-20">
//               dean@companywithalongdomain.co
//             </td>
//             <td className="pv3 pr3 bb b--black-20">71865178111909</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   </div>
// )

const RepositoriesTable = () => (
  <div className="pa4">
    <div className="overflow-auto">
      <table className="f6 w-100 mw8 center" cellSpacing="0">
        <thead>
          <tr className="stripe-dark">
            <th className="fw6 tl pa3 bg-white">Name</th>
            <th className="fw6 tl pa3 bg-white">Username</th>
            <th className="fw6 tl pa3 bg-white">Email</th>
            <th className="fw6 tl pa3 bg-white">ID</th>
          </tr>
        </thead>
        <tbody className="lh-copy">
          <tr className="stripe-dark">
            <td className="pa3">Hassan Johnson</td>
            <td className="pa3">@hassan</td>
            <td className="pa3">hassan@companywithalongdomain.co</td>
            <td className="pa3">14419232532474</td>
          </tr>
          <tr className="stripe-dark">
            <td className="pa3">Taral Hicks</td>
            <td className="pa3">@hicks</td>
            <td className="pa3">taral@companywithalongdomain.co</td>
            <td className="pa3">72326219423551</td>
          </tr>
          <tr className="stripe-dark">
            <td className="pa3">Tyrin Turner</td>
            <td className="pa3">@tt</td>
            <td className="pa3">ty@companywithalongdomain.co</td>
            <td className="pa3">92325170324444</td>
          </tr>
          <tr className="stripe-dark">
            <td className="pa3">Oliver Grant</td>
            <td className="pa3">@oli</td>
            <td className="pa3">oliverg@companywithalongdomain.co</td>
            <td className="pa3">71165170352909</td>
          </tr>
          <tr className="stripe-dark">
            <td className="pa3">Dean Blanc</td>
            <td className="pa3">@deanblanc</td>
            <td className="pa3">dean@companywithalongdomain.co</td>
            <td className="pa3">71865178111909</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
)

export { RepositoriesTable }
