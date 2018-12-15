<template>
    <v-card :class="{flip:flipped, claimed:claimed}" flat tile class="d-flex card">
		<div class="front">
			<!-- front content -->
		</div>
		<div :class="color" class="back">
			<!-- back content -->
		</div>
    </v-card>
</template>

<style>
.card {
    width:25%;
    height: 220px;
    transition: 0.6s;
	transform-style: preserve-3d;
    opacity: 1;
	position: relative;
}

.card.claimed {
    transition: opacity 1s;
     opacity: 0;
}

.card.flip {
    transform: rotateY(180deg);
}

.front, .back {
    backface-visibility: hidden;
    position:absolute;
    top:0;
    left:0;
}

.front {
    background:gray;
    height: 100%;
    width: 100%;
    transform: rotateY(0deg);
}

.back {
    height: 100%;
    width: 100%;
    transform: rotateY(180deg);
}
</style>

<script>
export default {
  props: {
      color:String,
      claimed:Boolean,
      flipped:Boolean
  }
}
</script>