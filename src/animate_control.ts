/* eslint-disable @typescript-eslint/no-explicit-any */

const pendingPromise = Promise.race.bind(Promise, []);

export default class AnimationControl {
    _cancel: undefined | (() => any) = undefined;
    _onFinishPromise: undefined | Promise<any> = undefined;
    _onFinishAction: undefined | (() => any) = undefined;

    cancel = (): void => {
        try {
            this._cancel && this._cancel();
        } catch (e) {
            console.log('Error canceling animation', e);
        }
    };

    createOnFinishPromise = (animationFinishPromise: Promise<any>): Promise<any> => {
        let hasCanceled = false;
        this._onFinishPromise = new Promise((fulfill, _reject) => {
            this._cancel = () => {
                fulfill(pendingPromise());
                hasCanceled = true;
            };

            try {
                animationFinishPromise
                    .then(() => {
                        !hasCanceled && fulfill();
                    })
                    .then(() => {
                        if (this._onFinishAction && !hasCanceled) {
                            this._onFinishAction();
                        }
                    });
            } catch (e) {
                _reject(e);
            }
        });
        return this._onFinishPromise;
    };

    setOnFinishAction = (action: () => any): void => {
        this._onFinishAction = action;
    };
}
