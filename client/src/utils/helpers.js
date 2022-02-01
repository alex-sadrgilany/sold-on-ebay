export function idbPromise(storeName, method, object) {
    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open("sold-on-ebay", 1);

        let db, tx, store;

        request.onupgradeneeded = function(event) {
            const db = request.result;

            db.createObjectStore("items", { keyPath: "_id" });
            db.createObjectStore("currentItemIndex", { keyPath: "_id" });
            db.createObjectStore("cart", { keyPath: "_id" });
        };

        request.onerror = function(event) {
            console.log("error");
        };

        request.onsuccess = function(event) {
            db = request.result;
            tx = db.transaction(storeName, "readwrite");
            store = tx.objectStore(storeName);

            db.onerror = function (e) {
                console.log("error", e);
            };

            switch (method) {
                case "put":
                    store.put(object);
                    resolve(object);
                    break;
                case "get":
                    const all = store.getAll();
                    all.onsuccess = function() {
                        resolve(all.result);
                    };
                    break;
                case "delete":
                    store.delete(object._id);
                    break;
                default:
                    console.log("no valid method");
                    break;
            };

            tx.oncomplete = function() {
                db.close();
            };
        };
    });
};
