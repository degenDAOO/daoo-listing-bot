import { MessageActionRow, MessageEmbed } from "discord.js";
import truncateForAddress from "lib/truncateForAddress";


function listingAction(data: any, attributes: any) {
  const fields = [
    {
      name: 'Price',
      value: `${data.item.market_place_state.price} SOL`,
      inline: true
    },
    {
      name: 'Seller',
      value: `[${truncateForAddress(data.item.market_place_state.seller_address as string)}](https://hyperspace.xyz/account/${data.item.market_place_state.seller_address})`,
      inline: true
    }
  ];

  if (data.item.project_id == 'degentrashpandas') {
    const traits = ['EXALTED_STAT', '❤️'];
    traits.map(key => {
      let trait = {
        name: key,
        value: attributes[key] ?? 'none',
        inline: true
      };
      fields.push(trait);
    });

    // Add in the divider between Price/Seller if we show metadata
    fields.splice(2, 0, {
      name: '\u200B',
      value: '__Hidden Traits__',
      inline: false
    });
  };

  const embedMsg = new MessageEmbed({
    color: 0xFEBB00,
    title: `Listed for: ${data.item.market_place_state.price} SOL`,
    description: '\u200B',
    url: `https://hyperspace.xyz/token/${data.token_address}`,
    image: {
      url: encodeURI(data.item.meta_data_img),
      width: 1069,
      height: 1069,
    },
    fields: fields,
    author: {
      name: `${data.item.name}  →  Rank: ${data.item?.rank_est}`
    },
    footer: {
      text: 'Data provided by Hyperspace  |  🤖 by JSB',
      icon_url: 'https://hyperspace.xyz/favicon-32x32.png'
    },
  });

  const actionRowMsg = new MessageActionRow({
    type: 1,
    components: [
      {
        style: 5,
        label: `Buy on Hyperspace`,
        url: `https://hyperspace.xyz/token/${data.token_address}`,
        disabled: false,
        emoji: {
          id: null,
          name: `🚀`
        },
        type: 2,
      }
    ]
  });
  return { actionRowMsg, embedMsg };
};

function saleAction(data: any, attributes: any) {
  const fields = [
    {
      name: 'Price',
      value: `${data.item.market_place_state.price} SOL`,
    },
    {
      name: 'Buyer',
      value: `[${truncateForAddress(data.item.market_place_state.buyer_address as string)}](https://hyperspace.xyz/account/${data.item.market_place_state.buyer_address})`,
      inline: true
    },
    {
      name: 'Seller',
      value: `[${truncateForAddress(data.item.market_place_state.seller_address as string)}](https://hyperspace.xyz/account/${data.item.market_place_state.seller_address})`,
      inline: true
    }
  ];

  if (data.item.project_id == 'degentrashpandas') {
    const traits = ['EXALTED_STAT', '❤️'];
    traits.map(key => {
      let trait = {
        name: key,
        value: attributes[key] ?? 'none',
        inline: true
      };
      fields.push(trait);
    });

    // Add in the divider between Price/Seller if we show metadata
    fields.splice(2, 0, {
      name: '\u200B',
      value: '__Hidden Traits__',
      inline: false
    });
  };

  const embedMsg = new MessageEmbed({
    color: 0x3FAF49,
    title: `${data.item.name}`,
    description: '\u200B',
    url: `https://hyperspace.xyz/token/${data.token_address}`,
    image: {
      url: encodeURI(data.item.meta_data_img),
      width: 1069,
      height: 1069,
    },
    fields: fields,
    author: {
      name: `${data.action_type}`
    },
    footer: {
      text: 'Data provided by Hyperspace  |  🤖 by JSB',
      icon_url: 'https://hyperspace.xyz/favicon-32x32.png'
    },
  });

  const actionRowMsg = new MessageActionRow({
    type: 1,
    components: [
      {
        style: 5,
        label: `View Transaction`,
        url: `https://solscan.io/tx/${data.request_details.signature}`,
        disabled: false,
        emoji: {
          id: null,
          name: `🕵🏻‍♂️`
        },
        type: 2,
      },
      {
        style: 5,
        label: `View on Hyperspace`,
        url: `https://hyperspace.xyz/token/${data.token_address}`,
        disabled: false,
        emoji: {
          id: null,
          name: `🚀`
        },
        type: 2,
      }
    ]
  });
  return { actionRowMsg, embedMsg };
};

function bidAction(data: any, attributes: any) {
  const fields = [
    {
      name: 'Bid',
      value: `${data.item.market_place_state.price} SOL`,
      inline: true
    },
    {
      name: 'Bidder',
      value: `[${truncateForAddress(data.item.market_place_state.buyer_address as string)}](https://hyperspace.xyz/account/${data.item.market_place_state.buyer_address})`,
      inline: true
    }
  ];

  if (data.item.project_id == 'degentrashpandas') {
    const traits = ['EXALTED_STAT', '❤️'];
    traits.map(key => {
      let trait = {
        name: key,
        value: attributes[key] ?? 'none',
        inline: true
      };
      fields.push(trait);
    });

    // Add in the divider between Price/Seller if we show metadata
    fields.splice(2, 0, {
      name: '\u200B',
      value: '__Hidden Traits__',
      inline: false
    });
  };

  const embedMsg = new MessageEmbed({
    color: 0x1E54AA,
    title: `New Bid on: ${data.item.name}`,
    description: '\u200B',
    url: `https://hyperspace.xyz/token/${data.token_address}`,
    image: {
      url: encodeURI(data.item.meta_data_img),
      width: 1069,
      height: 1069,
    },
    fields: fields,
    author: {
      name: `Rank: ${data.item?.rank_est}`
    },
    footer: {
      text: 'Data provided by Hyperspace  |  🤖 by JSB',
      icon_url: 'https://hyperspace.xyz/favicon-32x32.png'
    },
  });

  const actionRowMsg = new MessageActionRow({
    type: 1,
    components: [
      {
        style: 5,
        label: `View Transaction`,
        url: `https://solscan.io/tx/${data.request_details.signature}`,
        disabled: false,
        emoji: {
          id: null,
          name: `🕵🏻‍♂️`
        },
        type: 2,
      },
      {
        style: 5,
        label: `View on Hyperspace`,
        url: `https://hyperspace.xyz/token/${data.token_address}`,
        disabled: false,
        emoji: {
          id: null,
          name: `🚀`
        },
        type: 2,
      }
    ]
  });
  return { actionRowMsg, embedMsg };
}

const messageTypes: { [K: string]: Function } = {
  listing: listingAction,
  transaction: saleAction,
  bid: bidAction,
};

export function getMessage(name: string, message: string) {
  const data = JSON.parse(message);
	const attributes = data.item.attributes;

  if (messageTypes[name]) {
    return messageTypes[name](data, attributes);
  };

  throw new Error(`MessageType '${name}' is not implemented.`);
};