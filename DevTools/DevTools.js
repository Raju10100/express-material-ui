import React from 'react'
import {createDevTools} from 'redux-devtools'
import DockMonitor from 'redux-devtools-dock-monitor'
import Inspector from 'redux-devtools-inspector'

const DevTools = createDevTools(
        <DockMonitor
            toggleVisibilityKey='ctrl-h'
            changePositionKey='ctrl-q'
            defaultIsVisible={true}
        >
            <Inspector supportImmutable={true} />
        </DockMonitor>
)

export default DevTools