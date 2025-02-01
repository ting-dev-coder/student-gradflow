import { Box, Grid, GridProps, Skeleton } from '@mantine/core';

interface CardSkeletonProps extends GridProps {
  visible: boolean;
  amount: number;
  height: string;
  span: number;
}

const CardSkeleton = ({
  visible,
  amount,
  height,
  span,
  ...props
}: CardSkeletonProps) => {
  return (
    visible && (
      <Grid {...props}>
        {Array.from({ length: amount }).map(() => (
          <Grid.Col span={span}>
            <Skeleton height={height} />
          </Grid.Col>
        ))}
      </Grid>
    )
  );
};

export default CardSkeleton;
