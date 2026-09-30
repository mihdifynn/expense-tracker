import type { SxProps } from "@mui/material/styles";

// globals

const borderRadius = 3;

export const buttonSx = {
    borderRadius
} as const;



export const rootLayoutSx = {
    height: '100dvh',
    color: 'text.primary',
    bgcolor: 'background.default',
} as const satisfies SxProps;


export const appSx = {
    tabPanel: {
        flex: 1,
        overflow: 'auto',
    }
} as const satisfies Record<string, SxProps>;


export const heroSx = {
    parent: {
        borderRadius,
        mt: 2,
        mx: 1
    }
} as const satisfies Record<string, SxProps>;

export const addFormSx = {
    fab: {
        position: 'fixed',
        bottom: 16,
        right: 16,
    },
    buttonSx
} as const satisfies Record<string, SxProps>;