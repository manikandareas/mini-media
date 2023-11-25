export const getFeedActionColor = (color: string) => {
  const textColorMap = {
    cyan: "group-hover:text-cyan-500",
    blue: "group-hover:text-blue-500",
    green: "group-hover:text-green-500",
    rose: "group-hover:text-rose-500",
    sky: "group-hover:text-sky-500",
  };
  const iconColorMap = {
    cyan: "group-hover:bg-cyan-500/10 group-hover:text-cyan-500",
    blue: "group-hover:bg-blue-500/10 group-hover:text-blue-500",
    green: "group-hover:bg-green-500/10 group-hover:text-green-500",
    rose: "group-hover:bg-rose-500/10 group-hover:text-rose-500",
    sky: "group-hover:bg-sky-500/10 group-hover:text-sky-500",
  };
  switch (color) {
    case "cyan":
      return {
        text: textColorMap.cyan,
        icon: iconColorMap.cyan,
      };
    case "blue":
      return {
        text: textColorMap.blue,
        icon: iconColorMap.blue,
      };
    case "green":
      return {
        text: textColorMap.green,
        icon: iconColorMap.green,
      };
    case "rose":
      return {
        text: textColorMap.rose,
        icon: iconColorMap.rose,
      };
    case "sky":
      return {
        text: textColorMap.sky,
        icon: iconColorMap.sky,
      };
  }
};

// {
//     value: "1.1M",
//     icon: BarChart2,
//     color: "cyan",
//   },
//   {
//     value: "1,240",
//     icon: MessageCircle,
//     color: "blue",
//   },
//   {
//     value: "5,579",
//     icon: Repeat2,
//     color: "green",
//   },
//   {
//     value: "3,987",
//     icon: Heart,
//     color: "rose",
//   },
//   {
//     icon: Download,
//     color: "sky",
//   },
