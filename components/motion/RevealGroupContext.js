'use client';

import { createContext } from 'react';

// true inside a <RevealGroup>: the group triggers the animation and staggers its <Reveal> children
export const RevealGroupContext = createContext(false);
