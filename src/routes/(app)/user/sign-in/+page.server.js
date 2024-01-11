// @ts-nocheck

import * as db from '$lib/server/database';

// export function load({ cookies }) {
// 	let id = cookies.get('userid');

// 	if (!id) {
// 		id = crypto.randomUUID();
// 		cookies.set('userid', id, { path: '/' });
// 	}

// 	return {
// 		user: db.getUser(id)
// 	};
// }

// export const props = {
//     userData = db.getUser(id)
// };

// export const actions = {
//     default: async ({ request }) => {
//         const data = await request.formData()
//         const email = data.get("email")
//         const password = data.get("password")

//         let user = db.getUser(email);
//         console.log("user...",user);
//     }

//         };