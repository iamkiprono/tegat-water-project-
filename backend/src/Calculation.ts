// const farmers = [
//   {
//     name: "David Milot",
//     plotNo: "56",
//     readings: [
//       {
//         month: "January",
//         reading: 44,
//         standingCharge: 500,
//       },
//       {
//         month: "February",
//         reading: 56,
//         standingCharge: 500,
//       },
//       {
//         month: "March",
//         reading: 77,
//         standingCharge: 500,
//       },
//     ],
//     payments: [
//       { paymentID: "RJDOOJL", amount: 3000, paymentType: "MPESA" },
//       { paymentID: "7388137732837", amount: 4000, paymentType: "BANK" },
//     ],
//   },
//   {
//     name: "Miar Miono",
//     plotNo: "34",
//     readings: [
//       {
//         month: "January",
//         reading: 10,
//         standingCharge: 500,
//       },
//       {
//         month: "February",
//         reading: 19,
//         standingCharge: 500,
//       },
//       {
//         month: "March",
//         reading: 35,
//         standingCharge: 500,
//       },
//     ],
//     payments: [
//       { paymentID: "RJDOOJL", amount: 3000, paymentType: "MPESA" },
//       { paymentID: "7388137732837", amount: 4000, paymentType: "BANK" },
//     ],
//   },
//   {
//     name: "Mpanda Nganu",
//     plotNo: "34",
//     readings: [
//       {
//         month: "January",
//         reading: 78,
//         standingCharge: 500,
//       },
//       {
//         month: "February",
//         reading: 100,
//         standingCharge: 500,
//       },
//       {
//         month: "March",
//         reading: 123,
//         standingCharge: 500,
//       },
//     ],
//     payments: [
//       { paymentID: "RJDOOJL", amount: 3000, paymentType: "MPESA" },
//       { paymentID: "7388137732837", amount: 4000, paymentType: "BANK" },
//     ],
//   },
// ];

export const calculate = (
  name: string,
  farmerId: number,
  plotNo: string,
  current: number,
  currentId: number,
  prev: number,
  year: number,
  standingCharge: number,
  payments: {
    id: number;
    amount: number;
    date: Date;
    paymentType: string;
    farmerId: number;
  }[],
  month: string
) => {
  const count = current === 0 ? 0 : current - prev;
  const extraCount = count < 10 ? 0 : count - 10;
  const extraCharge = extraCount * 50;

  const paid = payments.reduce((acc, cur) => acc + cur.amount, 0);
  const monthlyBill = current === 0 ? 0 : standingCharge + extraCharge;
  const amountDue = monthlyBill;

  return {
    name,
    plotNo,
    farmerId,
    month,
    current,
    currentId,
    prev,
    year,
    count,
    extraCount,
    extraCharge,
    standingCharge,
    monthlyBill,
    payments,
    paid,
    amountDue,
  };
};

export const calculateBlank = (
  name: string,
  farmerId: number,
  plotNo: string,
  current: number,
  currentId: number,
  prev: number,
  year: number,
  standingCharge: number,
  payments: {
    id: number;
    amount: number;
    date: Date;
    paymentType: string;
    farmerId: number;
  }[],
  month: string,
  balance: number
) => {
  const count = current - prev;
  const extraCount = count < 10 ? 0 : count - 10;
  const extraCharge = extraCount * 50;

  const paid = payments.reduce((acc, cur) => acc + cur.amount, 0);
  const monthlyBill = balance;
  // const monthlyBill = standingCharge + extraCharge;
  // const monthlyBill = current === 0 ? 0 : standingCharge + extraCharge;
  const amountDue = monthlyBill;

  return {
    name,
    plotNo,
    farmerId,
    month,
    current,
    currentId,
    prev,
    year,
    count,
    extraCount,
    extraCharge,
    standingCharge,
    // monthlyBill: year === 2023 && month === "May" ? 0 : monthlyBill,
    monthlyBill,
    payments,
    paid,
    amountDue,
  };
};
// const billsFeb = farmers.map((farmer) => {
//   return calculate(
//     farmer.name,
//     farmer.readings[1].reading,
//     farmer.readings[0].reading,
//     farmer.readings[1].standingCharge,
//     // @ts-ignore
//     farmer.payments,
//     "February"
//   );
// });
// const billsMarch = farmers.map((farmer) => {
//   return calculate(
//     farmer.name,
//     farmer.readings[2].reading,
//     farmer.readings[1].reading,
//     farmer.readings[2].standingCharge,
//     // @ts-ignore
//     farmer.payments,
//     "March"
//   );
// });

// console.log(billsMarch);

// const allBills = [...billsFeb, ...billsMarch];

// console.log(allBills);
