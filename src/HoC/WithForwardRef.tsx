import React, { forwardRef } from 'react';

/** HoC to forward refs to the wrapped component */
const withForwardedRef = <P extends object>(
    WrappedComponent: React.ComponentType<P>
) => {
    return forwardRef<HTMLElement, P>((props, ref) => (
        <WrappedComponent {...props} ref={ref as React.Ref<any>} />
    ));
};

export default withForwardedRef;
