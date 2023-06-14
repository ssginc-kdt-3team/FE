import { setLoggedIn } from '../reducers/loginSilce';

const checkedLoggedIn = (ctx, next) => {
const isLoggedIn = ctx.store.getState().storage.isLoggedIn;

if (!isLoggedIn) {    //isLoggedIn = false면 401반환
  ctx.status = 401;   // Unauthorized
  return;
}

return next();

};

export default checkedLoggedIn;