interface ServiceInit {
  status: 'INIT';
}
interface ServiceLoading {
  status: 'LOADING';
}
interface ServiceLoaded<T> {
  status: 'LOADED';
  payload: T;
}
interface ServiceError {
  status: 'ERROR';
  error: Error;
}
export type Service<T> =
  | ServiceInit
  | ServiceLoading
  | ServiceLoaded<T>
  | ServiceError;