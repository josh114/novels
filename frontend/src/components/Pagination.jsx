// src/components/Pagination.jsx

const Pagination = ({ page, totalPages, onPrev, onNext, onFirst, onLast }) => {
  return (
    <HStack>
      <Button onClick={onFirst} disabled={page === 1}>
        First
      </Button>

      <Button onClick={onPrev} disabled={page === 1}>
        Prev
      </Button>

      <Text>
        Page {page} of {totalPages}
      </Text>

      <Button onClick={onNext} disabled={page === totalPages}>
        Next
      </Button>

      <Button onClick={onLast} disabled={page === totalPages}>
        Last
      </Button>
    </HStack>
  );
};

export default Pagination;
