
import { Store, Reducer, AnyAction } from 'redux';

export interface BaseObject {
    [x: string]: any;
}

export interface SetState {
    (data: BaseObject): any;
}

export interface GetState<T = any> { // T=any 参照redux类型文件Store类型
    (): T
}

export interface Module {
    state: BaseObject;
    mutations: {
        [x: string]: (setState: SetState, getState: GetState<BaseObject>) => any;
    };
}

export interface ModuleItem extends Module {
    type?: Type;
}

export interface Modules {
    [x: string]: ModuleItem;
}

export declare type Type = symbol;

export interface Reducers {
    [x: string]: (state: BaseObject, action: BaseObject) => any;
}
export interface MapMutations {
    [x: string]: {
        [x: string]: () => any;
    };
}


/**
 * storeCreater
 */
export declare const storeCreater: (modules: Modules, option?: any) => {
    store: Store<BaseObject, AnyAction> & {
        dispatch: {};
    };
    mapMutations: MapMutations;
    reducers: Reducer<BaseObject, AnyAction>;
};

/**
 * mutationCreater
 */
export declare const mutationCreater: ({ dispatch, getState }: Store<any, AnyAction>, modules: Modules) => MapMutations;

/**
 * reudcerCreater
 */
export declare const reudcerCreater: (modules: Modules) => Reducer<BaseObject, AnyAction>;

/**
 * reudcerCreater
 */
export declare const logger: ({ getState }: Store<any, AnyAction>) => (next: any) => (action: AnyAction) => void;