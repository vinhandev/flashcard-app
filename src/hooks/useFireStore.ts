import firestore from '@react-native-firebase/firestore';

type CollectionNameType = 'cards';

export default function useFireStore<T>(collection: CollectionNameType) {
  async function readAll() {
    return firestore().collection(collection).get();
  }

  async function read(doc: string) {
    return firestore().collection(collection).doc(doc).get();
  }

  async function add(data: T) {
    return firestore()
      .collection(collection)
      .add(data as any);
  }

  async function write(id: string, data: T) {
    return firestore()
      .collection(collection)
      .doc(id)
      .set(data as any);
  }

  async function remove(id: string) {
    return firestore().collection(collection).doc(id).delete();
  }

  return { readAll, read, add, write, remove };
}
